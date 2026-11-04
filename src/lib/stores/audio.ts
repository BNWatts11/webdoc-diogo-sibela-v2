import { writable, get } from 'svelte/store';
import { browser } from '$app/environment';

/**
 * Ported near-verbatim from reference/07-sound-concept.html's inline script.
 * One gentle master chain (lowpass + compressor), procedural noise/tone
 * generators per material, and a pace-throttle (`paced`) that decides how
 * full a gesture's sound is from the gap since the last one. In production,
 * swap the noise-buffer synthesis for ctx.decodeAudioData() on real
 * recordings of the box/costume/breath — same envelopes, same master chain.
 */

export const soundEnabled = writable(false);
export const volume = writable(55); // 0–100, matches the reference's <input type=range>

let ctx: AudioContext | null = null;
let master: GainNode | null = null;
let bedGain: GainNode | null = null;
let brownNoise: AudioBuffer | null = null;
let whiteNoise: AudioBuffer | null = null;

function volVal(): number {
	return (get(volume) / 100) * 0.7;
}

function makeNoise(ctx: AudioContext, kind: 'brown' | 'white'): AudioBuffer {
	const len = ctx.sampleRate * 2;
	const buf = ctx.createBuffer(1, len, ctx.sampleRate);
	const d = buf.getChannelData(0);
	if (kind === 'brown') {
		let lastv = 0;
		for (let i = 0; i < len; i++) {
			const w = Math.random() * 2 - 1;
			lastv = (lastv + 0.02 * w) / 1.02;
			d[i] = lastv * 3.5;
		}
	} else {
		for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
	}
	return buf;
}

function initAudio(): void {
	if (ctx || !browser) return;
	try {
		const AudioContextCtor =
			window.AudioContext ||
			(window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
		ctx = new AudioContextCtor();
	} catch {
		return;
	}
	master = ctx.createGain();
	master.gain.value = 0;
	const soft = ctx.createBiquadFilter();
	soft.type = 'lowpass';
	soft.frequency.value = 5200;
	soft.Q.value = 0.5;
	const comp = ctx.createDynamicsCompressor();
	comp.threshold.value = -24;
	comp.knee.value = 24;
	comp.ratio.value = 4;
	comp.attack.value = 0.02;
	comp.release.value = 0.3;
	master.connect(soft);
	soft.connect(comp);
	comp.connect(ctx.destination);

	brownNoise = makeNoise(ctx, 'brown');
	whiteNoise = makeNoise(ctx, 'white');

	// quiet stage bed — the room, always
	const bed = ctx.createBufferSource();
	bed.buffer = brownNoise;
	bed.loop = true;
	const bedF = ctx.createBiquadFilter();
	bedF.type = 'lowpass';
	bedF.frequency.value = 420;
	bedGain = ctx.createGain();
	bedGain.gain.value = 0;
	bed.connect(bedF);
	bedF.connect(bedGain);
	bedGain.connect(master);
	bed.start();
}

function setEnabled(on: boolean): void {
	soundEnabled.set(on);
	if (!ctx) return;
	if (ctx.state === 'suspended') ctx.resume();
	const now = ctx.currentTime;
	master!.gain.cancelScheduledValues(now);
	master!.gain.linearRampToValueAtTime(on ? volVal() : 0, now + 0.6);
	bedGain!.gain.linearRampToValueAtTime(on ? 0.04 : 0, now + 1.4);
}

function ensureOn(): void {
	if (!ctx) initAudio();
	if (!get(soundEnabled)) setEnabled(true);
}

/** the soft drag of cardboard — filtered brown noise on a slow scrape */
function drag(slow: number): void {
	if (!ctx || !master || !brownNoise) return;
	const t = ctx.currentTime;
	const src = ctx.createBufferSource();
	src.buffer = brownNoise;
	src.loop = true;
	const bp = ctx.createBiquadFilter();
	bp.type = 'bandpass';
	bp.Q.value = 0.9;
	const f0 = 255 + Math.random() * 70;
	bp.frequency.setValueAtTime(f0, t);
	bp.frequency.exponentialRampToValueAtTime(f0 * 0.62, t + 0.25 + 0.4 * slow);
	const lp = ctx.createBiquadFilter();
	lp.type = 'lowpass';
	lp.frequency.value = 1500;
	const g = ctx.createGain();
	const dur = 0.18 + 0.5 * slow;
	g.gain.setValueAtTime(0, t);
	g.gain.linearRampToValueAtTime(0.16 * (0.5 + 0.5 * slow), t + 0.04);
	g.gain.exponentialRampToValueAtTime(0.0008, t + dur);
	src.connect(bp);
	bp.connect(lp);
	lp.connect(g);
	g.connect(master);
	src.start(t);
	src.stop(t + dur + 0.05);
	src.onended = () => {
		src.disconnect();
		bp.disconnect();
		lp.disconnect();
		g.disconnect();
	};
}

/** costume rustle — grains of high-passed noise, quick decays */
function rustle(slow: number): void {
	if (!ctx || !master || !whiteNoise) return;
	const t = ctx.currentTime;
	const n = 3 + Math.floor(Math.random() * 3);
	for (let i = 0; i < n; i++) {
		const tt = t + i * (0.02 + Math.random() * 0.03);
		const src = ctx.createBufferSource();
		src.buffer = whiteNoise;
		src.loop = true;
		const hp = ctx.createBiquadFilter();
		hp.type = 'highpass';
		hp.frequency.value = 1600 + Math.random() * 1200;
		const g = ctx.createGain();
		g.gain.setValueAtTime(0, tt);
		g.gain.linearRampToValueAtTime(0.05 * (0.5 + 0.5 * slow), tt + 0.006);
		g.gain.exponentialRampToValueAtTime(0.0005, tt + 0.06 + Math.random() * 0.04);
		src.connect(hp);
		hp.connect(g);
		g.connect(master);
		src.start(tt);
		src.stop(tt + 0.18);
		src.onended = () => {
			src.disconnect();
			hp.disconnect();
			g.disconnect();
		};
	}
}

/** breath — a soft band of noise, inhale then exhale. Isabel's interiority. */
function breath(): void {
	if (!ctx || !master || !whiteNoise) return;
	const t = ctx.currentTime;
	const src = ctx.createBufferSource();
	src.buffer = whiteNoise;
	src.loop = true;
	const bp = ctx.createBiquadFilter();
	bp.type = 'bandpass';
	bp.Q.value = 0.7;
	bp.frequency.setValueAtTime(480, t);
	bp.frequency.linearRampToValueAtTime(900, t + 0.5);
	bp.frequency.linearRampToValueAtTime(420, t + 1.1);
	const g = ctx.createGain();
	g.gain.setValueAtTime(0.0001, t);
	g.gain.linearRampToValueAtTime(0.06, t + 0.45);
	g.gain.linearRampToValueAtTime(0.05, t + 0.62);
	g.gain.exponentialRampToValueAtTime(0.0006, t + 1.2);
	src.connect(bp);
	bp.connect(g);
	g.connect(master);
	src.start(t);
	src.stop(t + 1.3);
	src.onended = () => {
		src.disconnect();
		bp.disconnect();
		g.disconnect();
	};
}

/** wood settle — a single damped tone, set down gently */
function wood(): void {
	if (!ctx || !master || !whiteNoise) return;
	const t = ctx.currentTime;
	const o = ctx.createOscillator();
	o.type = 'triangle';
	o.frequency.setValueAtTime(190, t);
	o.frequency.exponentialRampToValueAtTime(120, t + 0.18);
	const lp = ctx.createBiquadFilter();
	lp.type = 'lowpass';
	lp.frequency.value = 1200;
	const g = ctx.createGain();
	g.gain.setValueAtTime(0.0001, t);
	g.gain.exponentialRampToValueAtTime(0.12, t + 0.008);
	g.gain.exponentialRampToValueAtTime(0.0006, t + 0.34);
	o.connect(lp);
	lp.connect(g);
	g.connect(master);
	o.start(t);
	o.stop(t + 0.4);

	const ns = ctx.createBufferSource();
	ns.buffer = whiteNoise;
	const nh = ctx.createBiquadFilter();
	nh.type = 'bandpass';
	nh.frequency.value = 900;
	const ng = ctx.createGain();
	ng.gain.setValueAtTime(0.05, t);
	ng.gain.exponentialRampToValueAtTime(0.0005, t + 0.05);
	ns.connect(nh);
	nh.connect(ng);
	ng.connect(master);
	ns.start(t);
	ns.stop(t + 0.08);

	o.onended = () => {
		o.disconnect();
		lp.disconnect();
		g.disconnect();
	};
	ns.onended = () => {
		ns.disconnect();
		nh.disconnect();
		ng.disconnect();
	};
	if (bedGain) {
		const n = ctx.currentTime;
		bedGain.gain.cancelScheduledValues(n);
		bedGain.gain.setValueAtTime(0.01, n);
		bedGain.gain.linearRampToValueAtTime(get(soundEnabled) ? 0.04 : 0, n + 0.9);
	}
}

/** magic reveal — a quick three-note chime rising through a fifth, plus a
 * touch of high shimmer, for the moment a hidden clip appears on hover */
function reveal(): void {
	if (!ctx || !master) return;
	const t = ctx.currentTime;
	const freqs = [660, 880, 1320];
	freqs.forEach((f, i) => {
		const o = ctx!.createOscillator();
		o.type = 'sine';
		o.frequency.value = f;
		const g = ctx!.createGain();
		const start = t + i * 0.045;
		g.gain.setValueAtTime(0.0001, start);
		g.gain.exponentialRampToValueAtTime(0.09, start + 0.02);
		g.gain.exponentialRampToValueAtTime(0.0005, start + 0.22);
		o.connect(g);
		g.connect(master!);
		o.start(start);
		o.stop(start + 0.26);
		o.onended = () => {
			o.disconnect();
			g.disconnect();
		};
	});
	if (whiteNoise) {
		const src = ctx.createBufferSource();
		src.buffer = whiteNoise;
		src.loop = true;
		const hp = ctx.createBiquadFilter();
		hp.type = 'highpass';
		hp.frequency.value = 5000;
		const g = ctx.createGain();
		g.gain.setValueAtTime(0, t);
		g.gain.linearRampToValueAtTime(0.03, t + 0.02);
		g.gain.exponentialRampToValueAtTime(0.0004, t + 0.3);
		src.connect(hp);
		hp.connect(g);
		g.connect(master);
		src.start(t);
		src.stop(t + 0.32);
		src.onended = () => {
			src.disconnect();
			hp.disconnect();
			g.disconnect();
		};
	}
}

/** the gap since the last move decides how full the sound is; exactly the
 * reference's dt-gap check — moving too fast keeps the room quiet. */
function paced(kind: 'drag' | 'rustle', now: number, lastRef: { v: number }): number | null {
	const dt = now - lastRef.v;
	lastRef.v = now;
	if (dt < 70) return null; // moving too fast → stay quiet
	return Math.min(Math.max((dt - 90) / 900, 0), 1); // rushing → 0, lingering → 1
}

const lastDragRef = { v: 0 };
const lastRustleRef = { v: 0 };

function playDrag(paceHint?: number): void {
	if (!get(soundEnabled)) return;
	const slow = paceHint ?? paced('drag', performance.now(), lastDragRef) ?? undefined;
	if (slow === undefined) return;
	drag(slow);
}

function playRustle(paceHint?: number): void {
	if (!get(soundEnabled)) return;
	const slow = paceHint ?? paced('rustle', performance.now(), lastRustleRef) ?? undefined;
	if (slow === undefined) return;
	rustle(slow);
}

function playBreath(): void {
	if (!get(soundEnabled)) return;
	breath();
}

function playWood(): void {
	// unlike the reference's sample-audition buttons (where clicking IS the
	// opt-in gesture), this fires on ordinary chapter-select clicks across
	// the real site — it must never enable sound on its own. "Off until you
	// ask for it" means only the house console's toggle turns sound on.
	if (!get(soundEnabled)) return;
	wood();
}

function playReveal(): void {
	if (!get(soundEnabled)) return;
	reveal();
}

function toggleEnabled(): void {
	if (!ctx) initAudio();
	setEnabled(!get(soundEnabled));
}

function setVolume(v: number): void {
	volume.set(v);
	if (ctx && get(soundEnabled) && master) {
		master.gain.setTargetAtTime(volVal(), ctx.currentTime, 0.05);
	}
}

export const audio = {
	ensureOn,
	toggleEnabled,
	setVolume,
	playDrag,
	playRustle,
	playBreath,
	playWood,
	playReveal
};
