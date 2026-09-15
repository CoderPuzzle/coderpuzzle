function findValidSplit(nums: number[]): number {
    // Coprimality of the two products is decided by shared prime
    // factors, never by the products themselves: with n up to 10^4 and
    // values up to 10^6, both sides reach thousands of digits. Boundary
    // i works exactly when no prime's occurrence span [first, last]
    // straddles it. A smallest-prime-factor sieve factorizes each
    // element in O(log value); a difference array blocks the straddled
    // boundaries; the first open boundary in [0, n - 2] wins.
    let top = 0;
    for (const value of nums) top = Math.max(top, value);
    const spf = new Int32Array(top + 1);
    for (let i = 0; i <= top; ++i) spf[i] = i;
    for (let d = 2; d * d <= top; ++d) {
        if (spf[d] === d) {
            for (let multiple = d * d; multiple <= top; multiple += d) {
                if (spf[multiple] === multiple) spf[multiple] = d;
            }
        }
    }
    const first = new Map<number, number>();
    const last = new Map<number, number>();
    nums.forEach((value, index) => {
        while (value > 1) {
            const prime = spf[value];
            if (!first.has(prime)) first.set(prime, index);
            last.set(prime, index);
            while (value % prime === 0) value = Math.floor(value / prime);
        }
    });
    const n = nums.length;
    const blocked = new Int32Array(n + 1);
    for (const [prime, lo] of first) {
        const hi = Math.min(last.get(prime)! - 1, n - 2);
        if (lo <= hi) {
            blocked[lo]++;
            blocked[hi + 1]--;
        }
    }
    let running = 0;
    for (let i = 0; i < n - 1; ++i) {
        running += blocked[i];
        if (running === 0) return i;
    }
    return -1;
}
