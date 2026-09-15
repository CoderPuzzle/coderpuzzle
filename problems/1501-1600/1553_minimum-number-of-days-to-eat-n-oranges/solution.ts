function minDays(n: number): number {
    // Two moves are ever worth trying from a pile of more than one orange:
    // pay off the remainder mod 2 in single-orange days and then halve, or
    // pay off the remainder mod 3 and take the 2n/3 bite. The reachable
    // states from n are the O(log^2 n) numbers produced by repeatedly
    // floor-dividing by 2 or 3, so a hash-map memo keeps the recursion
    // small even for n up to 2 * 10^9.
    const memo = new Map<number, number>();

    const dp = (remaining: number): number => {
        if (remaining <= 1) return remaining;
        const cached = memo.get(remaining);
        if (cached !== undefined) return cached;
        const days = Math.min(
            (remaining % 2) + 1 + dp(Math.floor(remaining / 2)),
            (remaining % 3) + 1 + dp(Math.floor(remaining / 3)),
        );
        memo.set(remaining, days);
        return days;
    };

    return dp(n);
}
