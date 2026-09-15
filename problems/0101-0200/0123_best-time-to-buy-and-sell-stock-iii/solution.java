class Solution {

    public int maxProfit(int[] prices) {
        // Wealth after each day in four states: after the first buy, first
        // sell, second buy, second sell. Buy states start at -1e9, a
        // sentinel meaning "not yet reachable" (prices are at most 1e5, so
        // no real debt is that deep); sell states start at 0 = never traded.
        int buy1 = -1000000000,
            buy2 = -1000000000;
        int sell1 = 0,
            sell2 = 0;
        for (int price : prices) {
            // Each state either keeps yesterday's value or transitions
            // today: buying adds -price, selling adds +price, on top of
            // the preceding state.
            // the cheapest first buy so far
            buy1 = Math.max(buy1, -price);
            sell1 = Math.max(sell1, buy1 + price);
            buy2 = Math.max(buy2, sell1 - price);
            sell2 = Math.max(sell2, buy2 + price);
        }
        // Each update reads the already-updated earlier states, so a
        // same-day buy-and-sell is allowed -- a zero-profit degenerate
        // transaction stands in for "do nothing", removing any need for a
        // transaction-count dimension. Hence sell2 >= sell1 >= 0 always,
        // and sell2 is correct even for plans using fewer transactions.
        return sell2;
    }
}
