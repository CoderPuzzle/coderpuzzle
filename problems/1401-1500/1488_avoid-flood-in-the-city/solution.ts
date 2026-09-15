function avoidFlood(rains: number[]): number[] {
    const n = rains.length;
    const zeros: number[] = [];
    const last = new Map<number, number>();
    const ans: number[] = new Array(n).fill(-1);
    for (let i = 0; i < n; i++) {
        const r = rains[i];
        if (r === 0) {
            ans[i] = 1;
            let lo = 0,
                hi = zeros.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (zeros[mid] <= i) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            zeros.splice(lo, 0, i);
        } else if (last.has(r)) {
            const prev = last.get(r);
            let lo = 0,
                hi = zeros.length;
            while (lo < hi) {
                const mid = (lo + hi) >> 1;
                if (zeros[mid] <= prev) {
                    lo = mid + 1;
                } else {
                    hi = mid;
                }
            }
            if (lo === zeros.length || zeros[lo] >= i) {
                return [];
            }
            ans[zeros[lo]] = r;
            zeros.splice(lo, 1);
            last.set(r, i);
        } else {
            last.set(r, i);
        }
    }
    return ans;
}
