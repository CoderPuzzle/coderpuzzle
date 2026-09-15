class Solution {

    public int maxProfit(int[] prices) {
        // End-of-day states: hold (own a share), sold (just sold today),
        // rest (own nothing, free to buy). The sentinel makes owning a
        // share before any purchase impossible.
        int hold = -1000000000,
            sold = 0,
            rest = 0;
        for (int price : prices) {
            // Cache yesterday's sold first: rest may only absorb a sale
            // made the day before, which is the cooldown.
            int prevSold = sold;
            // Keep the share, or buy at today's price from yesterday's
            // rest wealth (rest is rewritten after this read).
            hold = Math.max(hold, rest - price);
            // Sell into today's price.
            sold = hold + price;
            // Stay at rest or absorb the cached sale; since it is
            // yesterday's, the earliest rebuy is two days after selling.
            rest = Math.max(rest, prevSold);
        }
        // Ending while holding is worthless: an unsold purchase only
        // ever subtracted from wealth.
        return Math.max(sold, rest);
    }
}
