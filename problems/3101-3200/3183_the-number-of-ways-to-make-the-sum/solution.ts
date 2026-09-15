function numberOfWays(n: number): number {
    // Count first with the unlimited coins {1, 2, 6}: once b six-coins are
    // set aside, the leftover r is filled freely by one- and two-coins,
    // which gives floor(r / 2) + 1 arrangements per r. The value-4 coin
    // exists exactly twice, so its contribution is zero, one, or two
    // indistinguishable copies, each leaving a smaller target for the same
    // count. True totals stay near 1.3e9, far inside Number's exact
    // integer window below 2^53.
    const modulo = 1e9 + 7;
    let total = 0;
    for (const fours of [0, 4, 8]) {
        let rest = n - fours;
        while (rest >= 0) {
            total += Math.floor(rest / 2) + 1;
            rest -= 6;
        }
    }
    return total % modulo;
}
