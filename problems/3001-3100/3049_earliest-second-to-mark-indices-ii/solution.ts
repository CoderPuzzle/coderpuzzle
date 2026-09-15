function earliestSecondToMarkIndices(nums: number[], changeIndices: number[]): number {
    const n = nums.length;
    const m = changeIndices.length;

    // first occurrence (0-indexed second) of each index whose nums value is > 0
    const first: number[] = new Array(n).fill(-1);
    for (let i = m - 1; i >= 0; i--) {
        const idx = changeIndices[i] - 1;
        if (nums[idx] !== 0) first[idx] = i;
    }

    let total = n;
    for (let i = 0; i < n; i++) total += nums[i];

    function check(t: number): boolean {
        // array-based binary min-heap
        const h: number[] = [];
        let cnt = 0;
        let sum = 0;
        for (let i = t - 1; i >= 0; i--) {
            const idx = changeIndices[i] - 1;
            if (i !== first[idx]) {
                cnt += 1;
                continue;
            }
            h.push(nums[idx]);
            sum += nums[idx];
            let c = h.length - 1;
            while (c > 0) {
                const p = (c - 1) >> 1;
                if (h[p] <= h[c]) break;
                const tmp = h[p];
                h[p] = h[c];
                h[c] = tmp;
                c = p;
            }
            if (cnt > 0) {
                cnt -= 1;
            } else {
                cnt += 1;
                // pop the minimum
                const top = h[0];
                const last = h.pop() as number;
                sum -= top;
                if (h.length > 0) {
                    h[0] = last;
                    let c2 = 0;
                    for (;;) {
                        const l = 2 * c2 + 1;
                        const r = l + 1;
                        let s = c2;
                        if (l < h.length && h[l] < h[s]) s = l;
                        if (r < h.length && h[r] < h[s]) s = r;
                        if (s === c2) break;
                        const t2 = h[s];
                        h[s] = h[c2];
                        h[c2] = t2;
                        c2 = s;
                    }
                }
            }
        }
        return total - (sum + h.length) <= cnt;
    }

    let low = n;
    for (let i = 0; i < n; i++) low += first[i] !== -1 ? 1 : nums[i];
    let high = m;
    while (low <= high) {
        const mid = low + Math.floor((high - low) / 2);
        if (check(mid)) {
            high = mid - 1;
        } else {
            low = mid + 1;
        }
    }
    return low <= m ? low : -1;
}
