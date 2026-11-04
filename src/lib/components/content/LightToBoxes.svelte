<!--
  A small interactive sandbox bridging both solos: the same set of particles
  either drifts as soft light (Isabel — slowness, breath) or settles into
  draggable boxes (Diogo — weight, push, scatter). Toggling morphs one into
  the other; nothing here is essential content (the storyboards below carry
  that), so the canvas is decorative and the toggle buttons are the only
  keyboard-operable part.

  Two mechanics live inside it: in light mode, a bird sits hidden in the
  field — Isabel's solo plays bird sound without ever showing one, so here
  the visitor can move through the light to find it. In boxes mode, a
  handful of marked spots invite the visitor to fit boxes into them; filling
  every spot triggers an automatic scatter, echoing Diogo's own push/stack
  material.
-->
<script lang="ts">
	import { onMount } from 'svelte';
	import { get } from 'svelte/store';
	import { reducedMotion } from '$lib/stores/motion';
	import { t } from '$lib/i18n';

	let wrap: HTMLDivElement | undefined = $state();
	let canvas: HTMLCanvasElement | undefined = $state();
	let mode: 'light' | 'boxes' = $state('light');

	let ctx: CanvasRenderingContext2D;
	let W = 0,
		H = 0,
		dpr = 1;
	let rafId = 0;
	let running = false;

	interface Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		r: number;
		formT: number;
		targetT: number;
		rot: number;
		vrot: number;
		placed: boolean;
	}
	const COUNT = 24;
	let particles: Particle[] = [];
	const pointer = { x: -9999, y: -9999 };
	let dragIndex = -1;

	// the hidden bird — hover near it in light mode to reveal it
	interface Bird {
		xf: number;
		yf: number;
		reveal: number;
		wingPhase: number;
	}
	const bird: Bird = { xf: 0.6, yf: 0.3, reveal: 0, wingPhase: 0 };

	// the box-fitting puzzle — fill every marked spot to trigger a scatter
	interface Target {
		xf: number;
		yf: number;
		filled: boolean;
		filledBy: number | null;
	}
	let targets: Target[] = [];
	let sceneT = 0;
	let explodeTimer = 0;

	function rand(min: number, max: number) {
		return min + Math.random() * (max - min);
	}

	function initParticles() {
		particles = Array.from({ length: COUNT }, () => ({
			x: rand(0, W),
			y: rand(0, H),
			vx: rand(-0.18, 0.18),
			vy: rand(-0.12, 0.12),
			r: rand(11, 21),
			formT: 0,
			targetT: 0,
			rot: rand(0, Math.PI * 2),
			vrot: rand(-0.008, 0.008),
			placed: false
		}));
	}

	function initBird() {
		bird.xf = rand(0.55, 0.85);
		bird.yf = rand(0.15, 0.35);
		bird.reveal = 0;
		bird.wingPhase = 0;
	}

	function initTargets() {
		const n = 5;
		targets = Array.from({ length: n }, (_, i) => ({
			xf: 0.15 + (i * 0.7) / (n - 1),
			yf: 0.5,
			filled: false,
			filledBy: null
		}));
	}

	function clampNum(v: number, min: number, max: number) {
		return Math.min(max, Math.max(min, v));
	}

	function size() {
		if (!wrap || !canvas) return;
		dpr = Math.min(window.devicePixelRatio || 1, 2);
		W = wrap.clientWidth;
		H = wrap.clientHeight;
		canvas.width = W * dpr;
		canvas.height = H * dpr;
		ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
	}

	function setMode(next: 'light' | 'boxes') {
		mode = next;
		const t = next === 'boxes' ? 1 : 0;
		const still = get(reducedMotion);
		for (const p of particles) {
			p.targetT = t;
			if (still) p.formT = t;
		}
		if (still) draw();
	}

	function roundRectPath(
		c: CanvasRenderingContext2D,
		x: number,
		y: number,
		w: number,
		h: number,
		r: number
	) {
		c.beginPath();
		c.moveTo(x + r, y);
		c.arcTo(x + w, y, x + w, y + h, r);
		c.arcTo(x + w, y + h, x, y + h, r);
		c.arcTo(x, y + h, x, y, r);
		c.arcTo(x, y, x + w, y, r);
		c.closePath();
	}

	function step() {
		const still = get(reducedMotion);

		const sceneTarget = mode === 'boxes' ? 1 : 0;
		sceneT += (sceneTarget - sceneT) * 0.06;

		if (sceneT < 0.6) {
			const bx = bird.xf * W;
			const by = bird.yf * H;
			const dist = Math.hypot(pointer.x - bx, pointer.y - by);
			const revealTarget = dist < 130 ? Math.max(0, 1 - dist / 130) : 0;
			bird.reveal += (revealTarget - bird.reveal) * 0.15;
			bird.wingPhase += 0.18;
		} else {
			bird.reveal *= 0.92;
		}

		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];
			p.formT += (p.targetT - p.formT) * 0.06;

			if (i === dragIndex) {
				if (still) {
					p.x = pointer.x;
					p.y = pointer.y;
				} else {
					p.x += (pointer.x - p.x) * 0.35;
					p.y += (pointer.y - p.y) * 0.35;
				}
				p.vx = 0;
				p.vy = 0;
				continue;
			}
			if (p.placed) continue;
			if (still) continue;

			const drift = 1 - p.formT * 0.7;
			p.x += p.vx * drift;
			p.y += p.vy * drift;
			p.rot += p.vrot * p.formT;

			if (p.formT < 0.5) {
				const dx = p.x - pointer.x;
				const dy = p.y - pointer.y;
				const dist = Math.hypot(dx, dy);
				if (dist < 90 && dist > 0.01) {
					const f = ((90 - dist) / 90) * 0.6;
					p.vx += (dx / dist) * f * 0.06;
					p.vy += (dy / dist) * f * 0.06;
				}
			} else {
				for (let j = i + 1; j < particles.length; j++) {
					const q = particles[j];
					if (q.placed) continue;
					const dx = p.x - q.x;
					const dy = p.y - q.y;
					const dist = Math.hypot(dx, dy);
					const minD = (p.r + q.r) * 1.3;
					if (dist < minD && dist > 0.01) {
						const push = ((minD - dist) / minD) * 0.5;
						const nx = dx / dist;
						const ny = dy / dist;
						p.vx += nx * push * 0.04;
						p.vy += ny * push * 0.04;
						q.vx -= nx * push * 0.04;
						q.vy -= ny * push * 0.04;
					}
				}
			}

			if (p.x < p.r) {
				p.x = p.r;
				p.vx *= -0.6;
			}
			if (p.x > W - p.r) {
				p.x = W - p.r;
				p.vx *= -0.6;
			}
			if (p.y < p.r) {
				p.y = p.r;
				p.vy *= -0.6;
			}
			if (p.y > H - p.r) {
				p.y = H - p.r;
				p.vy *= -0.6;
			}
			p.vx *= 0.985;
			p.vy *= 0.985;
		}
	}

	function drawBird() {
		const alpha = bird.reveal * (1 - sceneT);
		if (alpha <= 0.01) return;
		const x = bird.xf * W;
		const y = bird.yf * H;
		const flap = Math.sin(bird.wingPhase) * 0.5 - 0.15;
		ctx.save();
		ctx.globalAlpha = alpha;
		ctx.translate(x, y);
		ctx.fillStyle = 'rgb(168,186,184)';
		ctx.beginPath();
		ctx.moveTo(-9, -2);
		ctx.lineTo(-22, -7);
		ctx.lineTo(-8, 5);
		ctx.closePath();
		ctx.fill();
		ctx.beginPath();
		ctx.ellipse(0, 0, 13, 10, 0, 0, Math.PI * 2);
		ctx.fill();
		ctx.save();
		ctx.translate(-1, -3);
		ctx.rotate(flap);
		ctx.fillStyle = 'rgb(140,158,156)';
		ctx.beginPath();
		ctx.moveTo(0, 0);
		ctx.quadraticCurveTo(4, -18, 21, -15);
		ctx.quadraticCurveTo(9, -6, 0, 0);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
		ctx.fillStyle = 'rgb(168,186,184)';
		ctx.beginPath();
		ctx.arc(15, -7, 7, 0, Math.PI * 2);
		ctx.fill();
		ctx.fillStyle = 'rgb(140,158,156)';
		ctx.beginPath();
		ctx.moveTo(20, -9);
		ctx.lineTo(30, -12);
		ctx.lineTo(21, -5);
		ctx.closePath();
		ctx.fill();
		ctx.fillStyle = 'rgb(16,12,9)';
		ctx.beginPath();
		ctx.arc(17, -8, 1.3, 0, Math.PI * 2);
		ctx.fill();
		ctx.restore();
	}

	function drawTargets() {
		const half = 22;
		for (const t of targets) {
			const tx = t.xf * W;
			const ty = t.yf * H;
			ctx.save();
			ctx.globalAlpha = sceneT * (t.filled ? 0.3 : 0.9);
			ctx.strokeStyle = t.filled ? 'rgba(196,136,90,0.5)' : 'rgba(236,228,214,0.6)';
			ctx.lineWidth = 2;
			ctx.setLineDash([5, 5]);
			roundRectPath(ctx, tx - half, ty - half, half * 2, half * 2, 6);
			ctx.stroke();
			ctx.setLineDash([]);
			ctx.restore();
		}
	}

	function draw() {
		ctx.clearRect(0, 0, W, H);
		if (sceneT < 0.95) drawBird();
		if (sceneT > 0.04) drawTargets();
		const cool: [number, number, number] = [168, 186, 184];
		const warm: [number, number, number] = [196, 136, 90];
		for (const p of particles) {
			const t = p.formT;
			const col: [number, number, number] = [
				Math.round(cool[0] + (warm[0] - cool[0]) * t),
				Math.round(cool[1] + (warm[1] - cool[1]) * t),
				Math.round(cool[2] + (warm[2] - cool[2]) * t)
			];
			ctx.save();
			ctx.translate(p.x, p.y);
			ctx.rotate(p.rot * t);
			const s = p.r * (1 + t * 0.35);

			if (t < 0.85) {
				const glowAlpha = 1 - t;
				const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, s * 2.4);
				grad.addColorStop(0, `rgba(${col[0]},${col[1]},${col[2]},${0.5 * glowAlpha + 0.06})`);
				grad.addColorStop(1, `rgba(${col[0]},${col[1]},${col[2]},0)`);
				ctx.fillStyle = grad;
				ctx.beginPath();
				ctx.arc(0, 0, s * 2.4, 0, Math.PI * 2);
				ctx.fill();
			}
			if (t > 0.15) {
				const radius = p.r * (1 - t) + 4 * t;
				roundRectPath(ctx, -s, -s, s * 2, s * 2, radius);
				ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.2 + 0.5 * t})`;
				ctx.fill();
				ctx.lineWidth = 1.2;
				ctx.strokeStyle = `rgba(${col[0]},${col[1]},${col[2]},${0.55 * t})`;
				ctx.stroke();
			}
			ctx.restore();
		}
	}

	function loop() {
		step();
		draw();
		if (running) rafId = requestAnimationFrame(loop);
	}

	function pointerPos(e: PointerEvent) {
		if (!canvas) return { x: -9999, y: -9999 };
		const r = canvas.getBoundingClientRect();
		return { x: e.clientX - r.left, y: e.clientY - r.top };
	}

	function onPointerMove(e: PointerEvent) {
		const pos = pointerPos(e);
		pointer.x = pos.x;
		pointer.y = pos.y;
		if (!running) {
			step();
			draw();
		}
	}

	function onPointerDown(e: PointerEvent) {
		const pos = pointerPos(e);
		let best = -1;
		let bestD = Infinity;
		for (let i = 0; i < particles.length; i++) {
			const p = particles[i];
			if (p.placed) continue;
			const d = Math.hypot(p.x - pos.x, p.y - pos.y);
			if (d < p.r * 2.2 && d < bestD) {
				bestD = d;
				best = i;
			}
		}
		if (best >= 0) {
			dragIndex = best;
			canvas?.setPointerCapture(e.pointerId);
		}
	}

	function trySnap(index: number): boolean {
		const p = particles[index];
		const SNAP_R = 34;
		for (const t of targets) {
			if (t.filled) continue;
			const tx = t.xf * W;
			const ty = t.yf * H;
			const d = Math.hypot(p.x - tx, p.y - ty);
			if (d < SNAP_R) {
				p.x = tx;
				p.y = ty;
				p.vx = 0;
				p.vy = 0;
				p.rot = 0;
				p.placed = true;
				t.filled = true;
				t.filledBy = index;
				checkPuzzleComplete();
				return true;
			}
		}
		return false;
	}

	function checkPuzzleComplete() {
		if (targets.length > 0 && targets.every((t) => t.filled)) {
			clearTimeout(explodeTimer);
			explodeTimer = window.setTimeout(explode, 550);
		}
	}

	function explode() {
		const cx = W / 2;
		const cy = H / 2;
		const still = get(reducedMotion);
		for (const p of particles) {
			p.placed = false;
			const dx = p.x - cx || rand(-1, 1);
			const dy = p.y - cy || rand(-1, 1);
			const dist = Math.hypot(dx, dy) || 1;
			if (still) {
				p.x = clampNum(p.x + (dx / dist) * rand(50, 100), p.r, W - p.r);
				p.y = clampNum(p.y + (dy / dist) * rand(50, 100), p.r, H - p.r);
				p.vx = 0;
				p.vy = 0;
			} else {
				const power = rand(4, 8);
				p.vx += (dx / dist) * power;
				p.vy += (dy / dist) * power;
			}
		}
		for (const t of targets) {
			t.filled = false;
			t.filledBy = null;
		}
		if (still) draw();
	}

	function onPointerUp() {
		if (dragIndex >= 0) {
			const snapped = sceneT > 0.5 ? trySnap(dragIndex) : false;
			if (!snapped) {
				const p = particles[dragIndex];
				p.vx += rand(-1.1, 1.1);
				p.vy += rand(-1.1, 1.1);
			}
		}
		dragIndex = -1;
		if (!running) {
			step();
			draw();
		}
	}

	onMount(() => {
		if (!canvas) return;
		ctx = canvas.getContext('2d')!;
		size();
		initParticles();
		initBird();
		initTargets();
		running = !get(reducedMotion);
		if (running) {
			loop();
		} else {
			draw();
		}

		const onResize = () => {
			size();
			draw();
		};
		window.addEventListener('resize', onResize);
		return () => {
			window.removeEventListener('resize', onResize);
			cancelAnimationFrame(rafId);
			clearTimeout(explodeTimer);
		};
	});
</script>

<div class="playground">
	<div class="toggle-row" role="group" aria-label={$t('postdance.sandbox-aria')}>
		<button
			type="button"
			class="mode-btn cool"
			class:on={mode === 'light'}
			aria-pressed={mode === 'light'}
			onclick={() => setMode('light')}
		>
			{$t('postdance.mode-isabel')}
		</button>
		<button
			type="button"
			class="mode-btn warm"
			class:on={mode === 'boxes'}
			aria-pressed={mode === 'boxes'}
			onclick={() => setMode('boxes')}
		>
			{$t('postdance.mode-diogo')}
		</button>
	</div>
	<div class="canvas-wrap" bind:this={wrap}>
		<canvas
			bind:this={canvas}
			aria-hidden="true"
			onpointermove={onPointerMove}
			onpointerdown={onPointerDown}
			onpointerup={onPointerUp}
			onpointercancel={onPointerUp}
		></canvas>
	</div>
	<p class="playground-caption">
		{mode === 'light' ? $t('postdance.caption-light') : $t('postdance.caption-boxes')}
	</p>
</div>

<style>
	.playground {
		margin-top: 24px;
	}
	.toggle-row {
		display: flex;
		gap: 10px;
		margin-bottom: 14px;
		flex-wrap: wrap;
	}
	.mode-btn {
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		padding: 10px 18px;
		border-radius: 99px;
		background: none;
		cursor: pointer;
		transition:
			background 0.3s ease,
			color 0.3s ease,
			border-color 0.3s ease;
	}
	.mode-btn.cool {
		border: 1px solid var(--breath-deep);
		color: var(--breath);
	}
	.mode-btn.cool.on {
		background: var(--breath);
		color: var(--ink);
	}
	.mode-btn.warm {
		border: 1px solid var(--kraft-deep);
		color: var(--kraft);
	}
	.mode-btn.warm.on {
		background: var(--kraft);
		color: var(--ink);
	}
	.canvas-wrap {
		position: relative;
		height: min(52vh, 420px);
		border-radius: 8px;
		overflow: hidden;
		/* fixed dark backdrop, not scene-reactive: the particles/targets drawn
		   on the canvas are painted with a fixed light-on-dark palette (see
		   the <script> block), so the stage behind them must stay dark
		   regardless of the site's reading theme, the same way a video
		   player's own background does. */
		background: radial-gradient(80% 100% at 50% 0%, rgba(120, 86, 52, 0.1), transparent 65%) #100c09;
		touch-action: none;
	}
	.canvas-wrap canvas {
		position: absolute;
		inset: 0;
		width: 100%;
		height: 100%;
		display: block;
		cursor: grab;
	}
	.playground-caption {
		margin: 12px 0 0;
		font-family: var(--mono);
		font-size: 11px;
		letter-spacing: 0.02em;
		color: var(--ash-dim);
	}
</style>
