class Solution {
  public:
    int maxProfit(vector<int> &prices) {
        // best seeds at 0: the profit of never trading. minPrice tracks the
        // cheapest buy seen so far, so each day needs only one candidate --
        // sell today against it -- instead of testing every buy/sell pair.
        int best = 0;
        int minPrice = prices[0];
        for (int price : prices) {
            if (price < minPrice) {
                minPrice = price;
            } else if (price - minPrice > best) {
                // The else-if is safe: a new-minimum price yields a
                // non-positive profit, which can never beat `best` (always
                // non-negative). Since minPrice only draws from
                // current-or-earlier days, buy-before-sell holds automatically.
                best = price - minPrice;
            }
        }
        return best;
    }
};
