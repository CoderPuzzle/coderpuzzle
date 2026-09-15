function maxSizedArray(s: number): number {
    // The total factors as M * T with M = n(n-1)/2 and T the per-bit count
    // of (j OR k) over all pairs; M*T <= s iff T <= floor(s / M), which
    // avoids oversized products. Bounds that keep every Number exact: the
    // doubling stops at hi <= 2^14 because T >= sum of j over [n/2, n) >=
    // 3n^2/8 - n/4 makes the total at n = 2^14 exceed 10^15 >= s, and with
    // n <= 2^14 every T <= 2n*M < 2^43 while s <= 10^15 < 2^53.
    const fits = (n: number): boolean => {
        if (n <= 1) return true;
        const m = (n * (n - 1)) / 2;
        let total = 0;
        for (let b = 0; 1 << b < 2 * n; b++) {
            let setCount = (n >> (b + 1)) << b;
            const rem = n & ((1 << (b + 1)) - 1);
            if (rem > 1 << b) setCount += rem - (1 << b);
            total += (1 << b) * (n * n - (n - setCount) * (n - setCount));
        }
        return total <= Math.floor(s / m);
    };
    let hi = 1;
    while (fits(hi)) hi *= 2;
    let lo = 1;
    while (lo < hi) {
        const mid = Math.floor((lo + hi) / 2);
        if (fits(mid)) lo = mid + 1;
        else hi = mid;
    }
    return lo - 1;
}
