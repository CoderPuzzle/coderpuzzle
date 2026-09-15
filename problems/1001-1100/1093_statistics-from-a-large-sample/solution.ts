function sampleStats(count: number[]): number[] {
    // One pass over the 256 buckets finds every statistic except the
    // median: min/max are the first/last nonzero buckets, the mode is the
    // largest count, and the mean needs the total count and the weighted
    // value sum (exact in doubles up to 2^53).
    let total = 0;
    let totalSum = 0;
    let first = -1;
    let last = -1;
    let mode = 0;
    for (let i = 0; i < 256; i++) {
        const c = count[i];
        if (c > 0) {
            if (first === -1) first = i;
            last = i;
            if (c > count[mode]) mode = i;
            total += c;
            totalSum += i * c;
        }
    }
    const mean = totalSum / total;
    // k-th smallest element (1-indexed), found by walking the buckets.
    const kth = (k: number): number => {
        let acc = 0;
        for (let i = 0; i < 256; i++) {
            acc += count[i];
            if (acc >= k) return i;
        }
        return 0;
    };
    let median: number;
    if (total % 2 === 1) {
        median = kth((total + 1) / 2);
    } else {
        median = (kth(total / 2) + kth(total / 2 + 1)) / 2.0;
    }
    return [first, last, mean, median, mode];
}
