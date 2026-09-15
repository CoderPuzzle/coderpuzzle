function countCommas(n: number): number {
    // Numbers with d digits carry Math.floor((d-1)/3) commas. Walk the comma
    // groups [1000, 999999], [10^6, 10^9 - 1], ...; every number in one group
    // carries the same comma count, so multiply the group size by that count.
    // The answer stays below 4 * 10^15, far inside Number's exact 2^53
    // range, and hi is clamped back to n (exact) before any arithmetic, so
    // plain numbers carry the whole computation exactly.
    let total = 0;
    let lo = 1000;
    let commas = 1;
    while (lo <= n) {
        let hi = lo * 1000 - 1;
        if (hi > n) hi = n;
        total += commas * (hi - lo + 1);
        lo = hi + 1;
        commas += 1;
    }
    return total;
}
