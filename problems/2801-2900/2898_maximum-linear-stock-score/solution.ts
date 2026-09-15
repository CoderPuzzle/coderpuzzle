function maxScore(prices: number[]): number {
    // prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
    // indexes[j - 1] rearranges to prices[i] - i equal on consecutive picks,
    // so every linear selection lives inside one offset group and any subset
    // of one group is linear.  Every price is >= 1, so the best subset of a
    // group is the whole group; the answer is the largest group total.  It is
    // bounded by 10^5 * 10^9 = 10^14 < 2^53, so a plain number carries it
    // exactly, past the 32-bit ceiling the typed languages clear with i64.
    const groupSum = new Map<number, number>();
    let best = 0;
    for (let day = 1; day <= prices.length; ++day) {
        const offset = prices[day - 1] - day;
        const total = (groupSum.get(offset) ?? 0) + prices[day - 1];
        groupSum.set(offset, total);
        if (total > best) {
            best = total;
        }
    }
    return best;
}
