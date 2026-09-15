function maximumBeauty(flowers: number[], newFlowers: number, target: number, full: number, partial: number): number {
    // Prefix sums reach ~1e10 and the answer up to ~1e10 — both below 2^53,
    // so plain numbers stay exact throughout.
    flowers.sort((a, b) => a - b);
    const n = flowers.length;
    const prefix = new Array<number>(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        prefix[i + 1] = prefix[i] + flowers[i];
    }
    let best = 0;
    let budget = newFlowers;
    for (let complete = 0; complete <= n; complete++) {
        if (complete > 0) {
            const need = Math.max(0, target - flowers[n - complete]);
            if (budget < need) {
                break;
            }
            budget -= need;
        }
        const rest = n - complete;
        if (rest === 0) {
            best = Math.max(best, complete * full);
            break;
        }
        if (flowers[rest - 1] >= target) {
            // every remaining garden is already complete; that split is
            // dominated by completing all of them for free.
            continue;
        }
        // Highest reachable minimum among the remaining gardens: binary search
        // on the water-fill level, with an O(log n) cost query per level.
        let low = flowers[0];
        let high = target - 1;
        let bestMin = low;
        while (low <= high) {
            const mid = Math.floor((low + high) / 2);
            let lo = 0;
            let hi = rest;
            while (lo < hi) {
                const midIdx = (lo + hi) >> 1;
                if (flowers[midIdx] >= mid) {
                    hi = midIdx;
                } else {
                    lo = midIdx + 1;
                }
            }
            const cost = mid * lo - prefix[lo];
            if (cost <= budget) {
                bestMin = mid;
                low = mid + 1;
            } else {
                high = mid - 1;
            }
        }
        best = Math.max(best, complete * full + bestMin * partial);
    }
    return best;
}
