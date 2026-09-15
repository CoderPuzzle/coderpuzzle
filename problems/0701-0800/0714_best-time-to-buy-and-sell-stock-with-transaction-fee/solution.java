class Solution {

    public long maxProfit(int[] prices, int fee) {
        // cash: best profit holding no share; hold: best profit holding one.
        // The sentinel makes pre-day-1 holding unreachable; cash=0 means do nothing.
        long cash = 0,
            hold = -1000000000000000000L;
        for (int price : prices) {
            // Both maxes read yesterday's values: sell charges the fee once,
            // on the sell leg; buy subtracts the price.
            long newCash = Math.max(cash, hold + price - fee);
            long newHold = Math.max(hold, cash - price);
            cash = newCash;
            hold = newHold;
        }
        // Ending with a share in hand is never better than having sold.
        return cash;
    }
}
