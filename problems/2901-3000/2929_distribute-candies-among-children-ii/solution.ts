function distributeCandies(n: number, limit: number): number {
    // Inclusion-exclusion over the three per-child caps: without caps the
    // splits of n among 3 children number C(n + 2, 2); forcing a child
    // over its cap is counted by C(n - (limit+1) + 2, 2), and the
    // alternating sum repairs double- and triple-forced overlaps. Every
    // term is at most 1.5 * 10^12 < 2^53, so Number arithmetic is exact.
    const cappedWays = (candies: number): number => (candies >= 2 ? (candies * (candies - 1)) / 2 : 0);
    return (
        cappedWays(n + 2) -
        3 * cappedWays(n - (limit + 1) + 2) +
        3 * cappedWays(n - 2 * (limit + 1) + 2) -
        cappedWays(n - 3 * (limit + 1) + 2)
    );
}
