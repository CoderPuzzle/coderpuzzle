from typing import List


class Solution:
    def maxScore(self, prices: List[int]) -> int:
        # prices[indexes[j]] - prices[indexes[j - 1]] == indexes[j] -
        # indexes[j - 1] rearranges to prices[i] - i equal on consecutive
        # picks, so every linear selection lives inside one offset group and
        # any subset of one group is linear.  Every price is >= 1, so the
        # best subset of a group is the whole group; the answer is the
        # largest group total.  It is bounded by 10^5 * 10^9 = 10^14, which
        # is why typed languages return a 64-bit integer (Python ints are
        # arbitrary precision).
        group_sum = {}
        for day, price in enumerate(prices, start=1):
            group_sum[price - day] = group_sum.get(price - day, 0) + price
        return max(group_sum.values())
