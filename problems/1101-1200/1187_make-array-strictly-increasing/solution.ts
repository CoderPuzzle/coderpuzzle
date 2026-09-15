function makeArrayIncreasing(arr1: number[], arr2: number[]): number {
    const b: number[] = Array.from(new Set(arr2)).sort((x, y) => x - y);
    const m = b.length;

    // bisectRight: index of first element > key
    const bisectRight = (key: number): number => {
        let lo = 0,
            hi = m;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (b[mid] <= key) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    };

    // dp: strictly increasing prefix whose last value is v -> min ops.
    // keeping arr1[0] costs 0; any smaller replacement costs 1 (larger
    // replacements are dominated by keeping)
    const dp = new Map<number, number>();
    dp.set(arr1[0], 0);
    for (const v of b) {
        if (v < arr1[0]) dp.set(v, 1);
    }

    for (let i = 1; i < arr1.length; i++) {
        const ndp = new Map<number, number>();
        for (const [last, ops] of dp) {
            // keep arr1[i] when it strictly exceeds last: no cost
            if (arr1[i] > last) {
                const cur = ndp.get(arr1[i]);
                if (cur === undefined || cur > ops) ndp.set(arr1[i], ops);
            }
            // replace with the smallest arr2 value > last: the smallest
            // choice leaves the most room for what follows; costs 1 op
            const idx = bisectRight(last);
            if (idx < m) {
                const v = b[idx];
                const cost = ops + 1;
                const cur = ndp.get(v);
                if (cur === undefined || cur > cost) ndp.set(v, cost);
            }
        }
        // no state survives: a strictly increasing arrangement is impossible
        if (ndp.size === 0) return -1;
        dp.clear();
        for (const [k, v] of ndp) dp.set(k, v);
    }

    let best = Infinity;
    for (const ops of dp.values()) best = Math.min(best, ops);
    return best;
}
