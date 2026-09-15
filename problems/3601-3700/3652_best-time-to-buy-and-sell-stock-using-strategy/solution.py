from typing import List


class Solution:
    def maxProfit(self, prices: List[int], strategy: List[int], k: int) -> int:
        # Only one window can change: rewriting it forfeits the window's
        # current weighted sum and collects the price sum of its second
        # half. Prefix sums over prices and over strategy[i] * prices[i]
        # make both parts an O(1) lookup per window position.
        n = len(prices)
        base = 0
        price_prefix = [0] * (n + 1)
        weighted_prefix = [0] * (n + 1)
        for i in range(n):
            base += strategy[i] * prices[i]
            price_prefix[i + 1] = price_prefix[i] + prices[i]
            weighted_prefix[i + 1] = weighted_prefix[i] + strategy[i] * prices[i]
        # At most one modification, so the untouched plan is always a candidate.
        best = base
        half = k // 2
        for left in range(n - k + 1):
            right = left + k
            removed = weighted_prefix[right] - weighted_prefix[left]
            gained = price_prefix[right] - price_prefix[left + half]
            best = max(best, base - removed + gained)
        return best
