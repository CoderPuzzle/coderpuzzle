function findMaximumNumber(k: number, x: number): number {
    const K = BigInt(k);

    // Accumulated price of n: for each watched bit position p = x, 2x, ...,
    // count how many numbers in [1, n] have bit p-1 set. BigInt keeps values
    // near 1e16 exact.
    function priceSum(n: bigint): bigint {
        let total = 0n;
        let p = x;
        // Positions with 2^(p-1) > n contribute nothing, so stop there.
        while (1n << BigInt(p - 1) <= n) {
            const b = BigInt(p - 1);
            // Bit b alternates in blocks of 2^b set / 2^b clear: count full
            // cycles plus the partial one over the first n+1 values.
            const cycle = 1n << (b + 1n);
            const np1 = n + 1n;
            const full = np1 / cycle;
            const rem = np1 % cycle;
            const half = 1n << b;
            let extra = rem - half;
            if (extra < 0n) extra = 0n;
            total += full * half + extra;
            p += x;
        }
        return total;
    }

    // The accumulated price is nondecreasing in n, so the answer is the
    // largest n with priceSum(n) <= k. First double hi until it is expensive.
    let lo = 0n;
    let hi = 10000000000000000n;
    while (priceSum(hi) <= K) {
        hi *= 2n;
    }
    // Invariant: lo is cheap, hi is expensive; lo ends as the answer.
    while (lo + 1n < hi) {
        const mid = (lo + hi) / 2n;
        if (priceSum(mid) <= K) {
            lo = mid;
        } else {
            hi = mid;
        }
    }
    return Number(lo);
}
