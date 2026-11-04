<!--
  Mood-board-style material tile — ported from reference/02-mood-board.html's
  .macro figure: a strip of tape, a raking-light overlay, newsprint caption.
-->
<script lang="ts">
	let {
		src,
		alt,
		label,
		description
	}: { src: string; alt: string; label: string; description?: string } = $props();
</script>

<figure class="macro">
	<span class="tape" aria-hidden="true"></span>
	<div class="img">
		<img {src} {alt} loading="lazy" />
	</div>
	<figcaption>
		<span class="t">{label}</span>
		{#if description}<span class="d">{description}</span>{/if}
	</figcaption>
</figure>

<style>
	.macro {
		position: relative;
		border-radius: 3px;
		overflow: hidden;
		border: 5px solid #ece6d6;
		box-shadow: 0 14px 30px -16px rgba(0, 0, 0, 0.85);
		margin: 0;
	}
	.macro .img {
		height: 165px;
		position: relative;
		background: var(--stage-deep);
	}
	.macro .img img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		display: block;
	}
	.macro .img::before {
		content: '';
		position: absolute;
		inset: 0;
		z-index: 2;
		background:
			linear-gradient(105deg, rgba(255, 244, 225, 0.22), transparent 40%),
			linear-gradient(285deg, rgba(0, 0, 0, 0.5), transparent 45%);
	}
	.tape {
		position: absolute;
		top: -7px;
		right: 18px;
		width: 54px;
		height: 18px;
		background: rgba(236, 230, 214, 0.5);
		transform: rotate(6deg);
		z-index: 3;
	}
	figcaption {
		background: #ece6d6;
		color: #3a342c;
		padding: 10px 12px;
	}
	.t {
		font-family: var(--mono);
		font-size: 10px;
		letter-spacing: 0.1em;
		text-transform: uppercase;
		color: #7a2f12;
		display: block;
	}
	.d {
		font-size: 0.82rem;
		color: #5a5147;
		line-height: 1.4;
		display: block;
		margin-top: 3px;
	}
</style>
