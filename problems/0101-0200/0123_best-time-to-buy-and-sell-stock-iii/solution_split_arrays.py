class Solution:
    def maxProfit(self, prices: list[int]) -> int:
        # Split the timeline at day i: the first sale must close by i, the
        # second must open at or after it, so the best plan is the best sale
        # in prices[0..i] plus the best sale in prices[i..n-1]. Two
        # half-line scans tabulate those bests for every split at once.
        n = len(prices)
        # Forward: best_prefix[i] is the best single-sale profit over days
        # 0..i -- the running minimum buys and day i's price sells.
        best_prefix = [0] * n
        min_price = prices[0]
        for i in range(1, n):
            min_price = min(min_price, prices[i])
            best_prefix[i] = max(best_prefix[i - 1], prices[i] - min_price)
        # Backward: best_suffix[i] is the best single-sale profit over days
        # i..n-1 -- day i's price buys and the running maximum sells.
        best_suffix = [0] * n
        max_price = prices[n - 1]
        for i in range(n - 2, -1, -1):
            max_price = max(max_price, prices[i])
            best_suffix[i] = max(best_suffix[i + 1], max_price - prices[i])
        # Both tables floor at 0, so an unused half of a split is a same-day
        # zero-profit sale -- Hint 3's placeholder -- and plans trading once
        # or never (split at n-1, where best_suffix is 0) need no special
        # casing. A sale ending on the split day may share it with the next
        # purchase: selling and rebuying at one price is financially just
        # holding, so it never inflates the total.
        return max(best_prefix[i] + best_suffix[i] for i in range(n))
