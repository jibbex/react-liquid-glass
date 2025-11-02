import '@testing-library/jest-dom/vitest'

class MockIntersectionObserver implements IntersectionObserver {
	readonly root: Element | Document | null
	readonly rootMargin: string
	readonly thresholds: ReadonlyArray<number>

	constructor(
		private readonly callback: IntersectionObserverCallback,
		options?: IntersectionObserverInit,
	) {
		this.root = options?.root ?? null
		this.rootMargin = options?.rootMargin ?? '0px'

		if (Array.isArray(options?.threshold)) {
			this.thresholds = options.threshold
		} else if (typeof options?.threshold === 'number') {
			this.thresholds = [options.threshold]
		} else {
			this.thresholds = [0]
		}
	}

	observe(target: Element): void {
		const rect = target.getBoundingClientRect()
		const entry: IntersectionObserverEntry = {
			time: Date.now(),
			target,
			isIntersecting: true,
			intersectionRatio: 1,
			boundingClientRect: rect,
			intersectionRect: rect,
			rootBounds: null,
		}

		this.callback([entry], this)
	}

	unobserve(): void {}

	disconnect(): void {}

	takeRecords(): IntersectionObserverEntry[] {
		return []
	}
}

const globalTarget = globalThis as typeof globalThis & {
	IntersectionObserver?: typeof IntersectionObserver
}

if (!globalTarget.IntersectionObserver) {
	globalTarget.IntersectionObserver = MockIntersectionObserver as unknown as typeof IntersectionObserver
}
