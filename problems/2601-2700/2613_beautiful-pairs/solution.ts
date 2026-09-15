function beautifulPair(nums1: number[], nums2: number[]): number[] {
    const n = nums1.length;
    // Identical points sit at distance 0, the instant global minimum,
    // so a duplicate is answered directly from earliest occurrences.
    const firstSeen = new Map<number, number>();
    let bestJ = n;
    let bestK = n;
    for (let i = 0; i < n; i++) {
        const key = nums1[i] * 100001 + nums2[i];
        if (!firstSeen.has(key)) {
            firstSeen.set(key, i);
        } else {
            const j = firstSeen.get(key)!;
            if (j * n + i < bestJ * n + bestK) {
                bestJ = j;
                bestK = i;
            }
        }
    }
    if (bestJ < n) {
        return [bestJ, bestK];
    }

    // Closest pair under Manhattan distance via divide and conquer: the
    // conquer scan walks each strip point forward while the y-gap is under
    // the running bound, so every shorter cross pair is seen.
    const idx = Array.from({ length: n }, (_, i) => i);
    idx.sort((p, q) => (nums1[p] !== nums1[q] ? nums1[p] - nums1[q] : nums2[p] - nums2[q]));
    const tmp = new Array<number>(n);

    const solve = (left: number, right: number): number => {
        if (right - left <= 3) {
            let delta = Infinity;
            for (let a = left; a < right; a++) {
                for (let b = a + 1; b < right; b++) {
                    delta = Math.min(
                        delta,
                        Math.abs(nums1[idx[a]] - nums1[idx[b]]) + Math.abs(nums2[idx[a]] - nums2[idx[b]]),
                    );
                }
            }
            const sub = idx.slice(left, right).sort((p, q) => nums2[p] - nums2[q]);
            for (let i = left; i < right; i++) {
                idx[i] = sub[i - left];
            }
            return delta === Infinity ? Number.MAX_SAFE_INTEGER : delta;
        }
        const mid = left + ((right - left) >> 1);
        const middle = nums1[idx[mid]];
        let delta = Math.min(solve(left, mid), solve(mid, right));
        const merged = idx.slice(left, right).sort((p, q) => nums2[p] - nums2[q]);
        for (let i = left; i < right; i++) {
            idx[i] = merged[i - left];
        }
        let length = left;
        for (let pos = left; pos < right; pos++) {
            if (Math.abs(nums1[idx[pos]] - middle) < delta) {
                tmp[length++] = idx[pos];
            }
        }
        for (let pos = left; pos < length; pos++) {
            for (let follow = pos + 1; follow < length && nums2[tmp[follow]] - nums2[tmp[pos]] < delta; follow++) {
                delta = Math.min(
                    delta,
                    Math.abs(nums1[tmp[pos]] - nums1[tmp[follow]]) + Math.abs(nums2[tmp[pos]] - nums2[tmp[follow]]),
                );
            }
        }
        return delta;
    };
    const dist = solve(0, n);

    // With minimum distance d the points are pairwise >= d apart, so a
    // d-sided hash grid holds a bounded handful of points per cell and
    // each distance-d edge surfaces exactly once from earlier indices.
    // Keys stay below 2^53: cell indices are <= 1e5, packed as cx * 200003 + cy.
    const cells = new Map<number, number[]>();
    for (let i = 0; i < n; i++) {
        const cx = Math.floor(nums1[i] / dist);
        const cy = Math.floor(nums2[i] / dist);
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
            for (let gy = cy - 1; gy <= cy + 1; gy++) {
                const bucket = cells.get(gx * 200003 + gy);
                if (!bucket) {
                    continue;
                }
                for (const j of bucket) {
                    const gap = Math.abs(nums1[i] - nums1[j]) + Math.abs(nums2[i] - nums2[j]);
                    if (gap === dist && j < bestJ) {
                        bestJ = j;
                        bestK = i;
                    }
                }
            }
        }
        const key = cx * 200003 + cy;
        if (!cells.has(key)) {
            cells.set(key, []);
        }
        cells.get(key)!.push(i);
    }
    return [bestJ, bestK];
}
