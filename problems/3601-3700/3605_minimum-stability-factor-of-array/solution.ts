function minStable(nums: number[], maxC: number): number {
    const n = nums.length;

    // Sparse table: st[k][i] is the gcd of nums[i .. i+2^k-1]. Two rows
    // tile any query window, so every window gcd is O(1) after the
    // O(n log n) build.
    const LOG = bitsLen(n);
    const st: number[][] = [nums.slice()];
    for (let k = 1; k < LOG; ++k) {
        const half = 1 << (k - 1);
        const length = n - (1 << k) + 1;
        const prev = st[k - 1];
        const row = new Array<number>(length);
        for (let i = 0; i < length; ++i) row[i] = gcd(prev[i], prev[i + half]);
        st.push(row);
    }

    const rangeGcd = (left: number, right: number): number => {
        const k = bitsLen(right - left + 1) - 1;
        const span = 1 << k;
        return gcd(st[k][left], st[k][right - span + 1]);
    };

    // Feasibility for a target length k: every window of size k+1 must be
    // broken. Editing one element to 1 breaks every window containing it,
    // so hitting a window's rightmost element covers the maximal run of
    // later window starts — greedily optimal.
    const feasible = (k: number): boolean => {
        const width = k + 1;
        if (width > n) return true;
        let edits = 0;
        let covered = -1;
        for (let start = 0; start + width <= n; ++start) {
            if (start <= covered) continue;
            if (rangeGcd(start, start + width - 1) > 1) {
                covered = start + width - 1;
                ++edits;
                if (edits > maxC) return false;
            }
        }
        return true;
    };

    let lo = 0,
        hi = n;
    while (lo < hi) {
        const mid = (lo + hi) >> 1;
        if (feasible(mid)) hi = mid;
        else lo = mid + 1;
    }
    return lo;
}

function bitsLen(x: number): number {
    let count = 0;
    while (x > 0) {
        x >>= 1;
        ++count;
    }
    return count;
}

function gcd(a: number, b: number): number {
    while (b !== 0) {
        const t = a % b;
        a = b;
        b = t;
    }
    return a;
}
