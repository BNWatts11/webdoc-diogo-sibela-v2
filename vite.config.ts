import adapter from '@sveltejs/adapter-vercel';
import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	server: {
		// let an external runner (e.g. the preview tool) pick the port via
		// $PORT instead of a hardcoded CLI flag; falls back to 5173 for `npm run dev`.
		port: Number(process.env.PORT) || 5173,
		strictPort: false
	},
	plugins: [
		sveltekit({
			compilerOptions: {
				// Force runes mode for the project, except for libraries. Can be removed in svelte 6.
				runes: ({ filename }) =>
					filename.split(/[/\\]/).includes('node_modules') ? undefined : true
			},
			// runtime pinned explicitly: the local dev Node (v26) is newer than
			// any runtime Vercel currently offers, which makes the adapter's
			// auto-detection from process.version fail at build time.
			adapter: adapter({ runtime: 'nodejs22.x' })
		})
	]
});
