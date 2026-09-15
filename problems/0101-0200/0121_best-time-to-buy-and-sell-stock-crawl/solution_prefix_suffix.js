/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
    const n = prices.length;
    // Every trade straddles some day i -- bought on or before it, sold
    // strictly after -- so each split can be scored on its own: the
    // cheapest buy anywhere in the prefix against the dearest sale still
    // to come in the suffix. Tabulate the future first, then sweep the
    // past against it.
    const bestSale = new Array(n);
    bestSale[n - 1] = prices[n - 1];
    for (let i = n - 2; i >= 0; i--) {
        bestSale[i] = Math.max(bestSale[i + 1], prices[i]);
    }
    let best = 0; // the profit of never trading
    let cheapest = prices[0];
    for (let i = 0; i + 1 < n; i++) {
        cheapest = Math.min(cheapest, prices[i]);
        // The split guarantees the sale day falls after the buy day, so
        // every candidate is a legal trade, never the same day bought
        // and sold.
        if (bestSale[i + 1] - cheapest > best) {
            best = bestSale[i + 1] - cheapest;
        }
    }
    return best;
};
