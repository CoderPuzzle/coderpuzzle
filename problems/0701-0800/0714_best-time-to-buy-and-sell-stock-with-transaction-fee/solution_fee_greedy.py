class Solution:
    def maxProfit(self, prices: list[int], fee: int) -> int:
        # total: profit already banked; basis: the fee-adjusted effective buy.
        # The sentinel opens beyond every price, so day one always sets the entry.
        total, basis = 0, 10**9
        for price in prices:
            # A rise past basis + fee clears a round trip: bank the surplus and
            # rebate the fee into the next buy, so a further rise extends the
            # same trade instead of opening a billable new one.
            if price > basis + fee:
                total += price - basis - fee
                basis = price - fee
            # A dip below the basis is a strictly cheaper entry: re-anchor free.
            elif price < basis:
                basis = price
        # Only banked profit counts; the trailing basis is bookkeeping, not a position.
        return total
