function kthSmallestProduct(nums1: number[], nums2: number[], k: number): number {
    // exact floored division for |a| <= ~1e10, |b| <= 1e5 (well within 2^53)
    const floorDiv = (a: number, b: number): number => {
        const q = Math.trunc(a / b);
        const r = a - q * b;
        if (r !== 0 && r < 0 !== b < 0) {
            return q - 1;
        }
        return q;
    };
    // number of elements <= t
    const upperBound = (a: number[], t: number): number => {
        let lo = 0,
            hi = a.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (a[mid] <= t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    // number of elements < t
    const lowerBound = (a: number[], t: number): number => {
        let lo = 0,
            hi = a.length;
        while (lo < hi) {
            const mid = (lo + hi) >> 1;
            if (a[mid] < t) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    };
    const countLe = (v: number): number => {
        let cnt = 0;
        const n2 = nums2.length;
        for (const x of nums1) {
            if (x > 0) {
                // x * y <= v  ->  y <= floor(v / x)
                cnt += upperBound(nums2, floorDiv(v, x));
            } else if (x < 0) {
                // x * y <= v, x < 0  ->  y >= ceil(v / x)
                cnt += n2 - lowerBound(nums2, -floorDiv(-v, x));
            } else {
                // x == 0: product is 0
                if (v >= 0) {
                    cnt += n2;
                }
            }
        }
        return cnt;
    };

    let lo = -10000000000 - 1,
        hi = 10000000000 + 1;
    while (lo < hi) {
        const mid = lo + Math.floor((hi - lo) / 2);
        if (countLe(mid) >= k) {
            hi = mid;
        } else {
            lo = mid + 1;
        }
    }
    return lo;
}
