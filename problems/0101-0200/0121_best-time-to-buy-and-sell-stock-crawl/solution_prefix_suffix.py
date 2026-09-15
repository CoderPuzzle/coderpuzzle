class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        n = len(prices)
        # Every trade straddles some day i -- bought on or before it, sold
        # strictly after -- so each split can be scored on its own: the
        # cheapest buy anywhere in the prefix against the dearest sale
        # still to come in the suffix. Tabulate the future first, then
        # sweep the past against it.
        best_sale = [0] * n
        best_sale[-1] = prices[-1]
        for i in range(n - 2, -1, -1):
            best_sale[i] = max(best_sale[i + 1], prices[i])
        best = 0  # the profit of never trading
        cheapest = prices[0]
        for i in range(n - 1):
            cheapest = min(cheapest, prices[i])
            # The split guarantees the sale day falls after the buy day,
            # so every candidate is a legal trade, never the same day
            # bought and sold.
            if best_sale[i + 1] - cheapest > best:
                best = best_sale[i + 1] - cheapest
        return best
