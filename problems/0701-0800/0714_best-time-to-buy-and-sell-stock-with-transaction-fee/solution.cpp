class Solution {
  public:
    long long maxProfit(vector<int> &prices, int fee) {
        // cash: best profit holding no share; hold: best profit holding one.
        // The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
        long long cash = 0, hold = -1000000000000000000LL;
        for (int price : prices) {
            // Both maxes read yesterday's values: sell charges the fee once,
            // on the sell leg; buy subtracts the price.
            long long newCash = max(cash, hold + price - fee);
            long long newHold = max(hold, cash - price);
            cash = newCash;
            hold = newHold;
        }
        // Ending with a share in hand is never better than having sold.
        return cash;
    }
};
