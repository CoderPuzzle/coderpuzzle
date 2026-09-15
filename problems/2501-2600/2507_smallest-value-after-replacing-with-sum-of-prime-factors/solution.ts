function smallestValue(n: number): number {
    // Replace while the factor sum actually shrinks n: composites other than
    // 4 strictly decrease, primes and 4 are fixed points, so the first
    // non-shrinking value is the smallest n ever takes. Trial division to
    // the square root factors each intermediate value.
    while (true) {
        let total = 0;
        let remaining = n;
        for (let d = 2; d * d <= remaining; ++d) {
            while (remaining % d === 0) {
                total += d;
                remaining /= d;
            }
        }
        if (remaining > 1) total += remaining;
        if (total >= n) return n;
        n = total;
    }
}
