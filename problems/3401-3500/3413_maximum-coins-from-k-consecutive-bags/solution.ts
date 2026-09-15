function maximumCoins(coins: number[][], k: number): number {
    const segments = coins.slice().sort((a, b) => a[0] - b[0]); // stable
    const n = segments.length;
    const lefts = segments.map((s) => s[0]);
    const rights = segments.map((s) => s[1]);
    const cs = segments.map((s) => s[2]);
    // Per-segment totals and prefix sums: any run of fully covered
    // segments sums in O(1).
    const area: number[] = new Array(n);
    for (let i = 0; i < n; i++) area[i] = cs[i] * (rights[i] - lefts[i] + 1);
    const prefix: number[] = new Array(n + 1);
    prefix[0] = 0;
    for (let i = 0; i < n; i++) prefix[i + 1] = prefix[i] + area[i];

    // first index i in [0, n) with arr[i] >= target, else n  (bisect_left)
    const lowerBound = (arr: number[], target: number): number => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };
    // first index i in [0, n) with arr[i] > target, else n  (bisect_right)
    const upperBound = (arr: number[], target: number): number => {
        let lo = 0,
            hi = arr.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (arr[mid] <= target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // Coins inside [start, start + k - 1]. `a` is the first segment whose
    // right end reaches the window; `b` the last whose left end falls
    // inside it.
    const window = (start: number): number => {
        const end = start + k - 1;
        const a = lowerBound(rights, start);
        const b = upperBound(lefts, end) - 1;
        // No segment intersects the window.
        if (a > b) return 0;
        // Clip the two boundary segments to the window; the segments in
        // between are fully covered. Segments are disjoint, so clipping
        // both partial ends never double counts.
        const loA = Math.max(lefts[a], start);
        const hiA = Math.min(rights[a], end);
        if (a === b) {
            // Window meets only one segment: plain density * clipped length.
            return loA <= hiA ? cs[a] * (hiA - loA + 1) : 0;
        }
        const loB = Math.max(lefts[b], start);
        const hiB = Math.min(rights[b], end);
        // Full run from the prefix sum, then swap each boundary segment's
        // full area for its clipped part.
        let total = prefix[b + 1] - prefix[a];
        total += cs[a] * (hiA - loA + 1) - area[a];
        total += cs[b] * (hiB - loB + 1) - area[b];
        return total;
    };

    // An optimal window can always slide until its left end meets some li
    // or its right end meets some ri, so these 2n starts cover the optimum.
    // rights[i] - k + 1 may be negative; positions before 1 simply hold
    // nothing and the binary searches handle them.
    let best = 0;
    for (let i = 0; i < n; i++) {
        for (const candidate of [lefts[i], rights[i] - k + 1]) {
            const value = window(candidate);
            if (value > best) best = value;
        }
    }
    return best;
}
