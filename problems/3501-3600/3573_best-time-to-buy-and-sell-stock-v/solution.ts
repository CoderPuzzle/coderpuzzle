function maximumProfit(prices: number[], k: number): number {
    // Per day, for each count t of completed transactions: done[t] =
    // flat, openLong[t] = holding a bought share, openShort[t] = holding
    // a shorted share. NEG marks impossible states; all real totals are
    // >= 0 and stay far above it (k * 1e9 <= 5e11 < 2^53, exact).
    const NEG = -1e15;
    let done: number[] = new Array(k + 1).fill(NEG);
    let openLong: number[] = new Array(k + 1).fill(NEG);
    let openShort: number[] = new Array(k + 1).fill(NEG);
    done[0] = 0;
    for (const price of prices) {
        // Closes today complete transaction t+1 from an open position.
        const nd = done.slice();
        for (let t = 0; t < k; ++t) {
            nd[t + 1] = Math.max(done[t + 1], openLong[t] + price, openShort[t] - price);
        }
        // Opens read done[t] from BEFORE today's closes: a close and the
        // next open can never share a day (and an open can never close
        // the same day, since closes read the old open row).
        const nl = openLong.slice();
        const ns = openShort.slice();
        for (let t = 0; t <= k; ++t) {
            nl[t] = Math.max(nl[t], done[t] - price);
            ns[t] = Math.max(ns[t], done[t] + price);
        }
        done = nd;
        openLong = nl;
        openShort = ns;
    }
    return Math.max(...done);
}
