function minMergeCost(lists: number[][]): number {
    const n = lists.length;
    const size = 1 << n;

    // Total length of every mask, built up from its lowest set bit.
    const totalLen: number[] = new Array(size).fill(0);
    for (let mask = 1; mask < size; mask++) {
        const low = mask & -mask;
        let idx = 0;
        while (((low >> idx) & 1) === 0) {
            idx++;
        }
        totalLen[mask] = totalLen[mask ^ low] + lists[idx].length;
    }

    // Left-middle median of every mask, found without materializing the
    // merged list: binary search the sorted value pool for the smallest
    // value with more than half the mask's elements at or below it.
    const vals: number[] = [];
    for (const one of lists) {
        for (const v of one) {
            vals.push(v);
        }
    }
    vals.sort((x, y) => x - y);
    const med: number[] = new Array(size).fill(0);
    for (let mask = 1; mask < size; mask++) {
        const rank = (totalLen[mask] - 1) / 2;
        let lo = 0;
        let hi = vals.length - 1;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            let cnt = 0;
            for (let i = 0; i < n; i++) {
                if ((mask >> i) & 1) {
                    cnt += countAtMost(lists[i], vals[mid]);
                }
            }
            if (cnt > rank) {
                hi = mid;
            } else {
                lo = mid + 1;
            }
        }
        med[mask] = vals[lo];
    }

    // dp over subsets: the last merge of a mask always pays the mask's
    // total length plus the gap between the two merged-in medians, so
    // only the split itself is a free choice.
    const INF = Infinity;
    const dp: number[] = new Array(size).fill(INF);
    for (let mask = 1; mask < size; mask++) {
        if ((mask & (mask - 1)) === 0) {
            dp[mask] = 0;
            continue;
        }
        let best = INF;
        for (let sub = (mask - 1) & mask; sub !== 0; sub = (sub - 1) & mask) {
            const other = mask ^ sub;
            if (sub < other) {
                // each unordered split exactly once
                const cost = dp[sub] + dp[other] + totalLen[mask] + Math.abs(med[sub] - med[other]);
                if (cost < best) {
                    best = cost;
                }
            }
        }
        dp[mask] = best;
    }
    return dp[size - 1];
}

// Number of elements at or below key in a sorted array.
function countAtMost(arr: number[], key: number): number {
    let lo = 0;
    let hi = arr.length;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (arr[mid] <= key) {
            lo = mid + 1;
        } else {
            hi = mid;
        }
    }
    return lo;
}
