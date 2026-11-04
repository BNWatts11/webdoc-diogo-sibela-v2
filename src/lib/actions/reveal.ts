/**
 * Adds `.is-visible` the first time an element scrolls into view, then stops
 * watching. Motion-safety is left to CSS (`prefers-reduced-motion` / the
 * house console's Stillness toggle both already disable transitions on
 * `.is-visible` targets elsewhere in this project) rather than duplicated
 * here — the class always gets added, it's just that nothing animates when
 * those apply.
 */
export function reveal(node: HTMLElement) {
	const observer = new IntersectionObserver(
		([entry]) => {
			if (entry.isIntersecting) {
				node.classList.add('is-visible');
				observer.unobserve(node);
			}
		},
		{ threshold: 0.15, rootMargin: '0px 0px -10% 0px' }
	);
	observer.observe(node);

	return {
		destroy() {
			observer.disconnect();
		}
	};
}
