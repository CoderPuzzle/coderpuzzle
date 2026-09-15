from bisect import bisect_right
from typing import List


class Solution:
    def minimumRelativeLosses(self, prices: List[int], queries: List[List[int]]) -> List[int]:
        prices.sort()
        n = len(prices)
        prefix = [0] * (n + 1)
        for i, price in enumerate(prices):
            prefix[i + 1] = prefix[i] + price
        answer = []
        for k, m in queries:
            split = bisect_right(prices, k)
            # Buy the cheapest j chocolates priced <= k and the m-j most
            # expensive ones above it. Stepping j -> j+1 swaps in prices[j]
            # and drops prices[n-m+j], both nondecreasing in j, so the
            # marginal change p[j] + p[n-m+j] - 2k never decreases: find the
            # first j whose swap stops paying off.
            lo, hi = max(0, m - (n - split)), min(m, split)
            while lo < hi:
                mid = (lo + hi) // 2
                if prices[mid] + prices[n - m + mid] >= 2 * k:
                    hi = mid
                else:
                    lo = mid + 1
            rest = m - lo
            answer.append(prefix[lo] + 2 * k * rest - (prefix[n] - prefix[n - rest]))
        return answer
