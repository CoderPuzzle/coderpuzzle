class Solution {
  public:
    int maxProfit(vector<int> &prices) {
        int n = (int)prices.size();
        // Every trade straddles some day i -- bought on or before it, sold
        // strictly after -- so each split can be scored on its own: the
        // cheapest buy anywhere in the prefix against the dearest sale
        // still to come in the suffix. Tabulate the future first, then
        // sweep the past against it.
        vector<int> bestSale(n);
        bestSale[n - 1] = prices[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            bestSale[i] = max(bestSale[i + 1], prices[i]);
        }
        int best = 0; // the profit of never trading
        int cheapest = prices[0];
        for (int i = 0; i + 1 < n; i++) {
            cheapest = min(cheapest, prices[i]);
            // The split guarantees the sale day falls after the buy day,
            // so every candidate is a legal trade, never the same day
            // bought and sold.
            if (bestSale[i + 1] - cheapest > best) {
                best = bestSale[i + 1] - cheapest;
            }
        }
        return best;
    }
};
