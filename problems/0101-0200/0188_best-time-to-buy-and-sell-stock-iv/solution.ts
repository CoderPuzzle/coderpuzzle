function maxProfit(k: number, prices: number[]): number {
    const n = prices.length;
    if (n < 2 || k === 0) return 0;
    if (k >= Math.floor(n / 2)) {
        // The limit can never bind: sum every upward move.
        let total = 0;
        for (let i = 1; i < n; i++) total += Math.max(prices[i] - prices[i - 1], 0);
        return total;
    }
    // buy[j]: best cash while holding the j-th buy; sell[j]: best profit
    // after j completed sells. -Infinity marks impossible holdings.
    const buy: number[] = new Array(k + 1).fill(-Infinity);
    const sell: number[] = new Array(k + 1).fill(0);
    for (const price of prices) {
        for (let j = 1; j <= k; j++) {
            // Keep holding, or buy now out of j-1 finished transactions.
            buy[j] = Math.max(buy[j], sell[j - 1] - price);
            // Stay sold, or sell the held position at today's price.
            // Updating buy first permits a same-day buy-then-sell, which is
            // a zero-profit transaction and never harms optimality.
            sell[j] = Math.max(sell[j], buy[j] + price);
        }
    }
    // sell[k] is the best profit with at most k transactions.
    return sell[k];
}
