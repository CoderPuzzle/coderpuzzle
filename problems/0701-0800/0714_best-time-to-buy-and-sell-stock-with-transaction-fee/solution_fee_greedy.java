class Solution {

    public long maxProfit(int[] prices, int fee) {
        // total: profit already banked; basis: the fee-adjusted effective buy.
        // The sentinel opens beyond every price, so day one always sets the entry.
        long total = 0,
            basis = 1000000000000000000L;
        for (int price : prices) {
            // A rise past basis + fee clears a round trip: bank the surplus and
            // rebate the fee into the next buy, so a further rise extends the
            // same trade instead of opening a billable new one.
            if (price > basis + fee) {
                total += price - basis - fee;
                basis = price - fee;
            } else if (price < basis) {
                // A dip below the basis is a strictly cheaper entry.
                basis = price;
            }
        }
        // Only banked profit counts; the trailing basis is bookkeeping, not a position.
        return total;
    }
}
