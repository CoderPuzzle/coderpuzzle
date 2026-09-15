from typing import List, Optional


class Solution:
    def minArrayLength(self, nums: List[int], k: int) -> int:
        # A zero merges with anything (0 * y = 0 <= k), so it drags the
        # whole array down to a single element.
        if 0 in nums:
            return 1
        # Merge adjacent ones (1 * 1 = 1 <= k) so no two neighbors are both
        # 1; every remaining pair then multiplies to at least 2, which
        # bounds each backward scan by 2 * log2(k).
        b = []
        for v in nums:
            if v != 1 or not b or b[-1] != 1:
                b.append(v)
        m = len(b)
        dp = [0] * (m + 1)
        for i in range(1, m + 1):
            dp[i] = dp[i - 1] + 1
            # Walk left multiplying while the merged product stays <= k:
            # each surviving j is the block b[j-1..i-1] merged to one spot.
            prod = 1
            j = i
            while j >= 1:
                prod *= b[j - 1]
                if prod > k:
                    break
                if dp[j - 1] + 1 < dp[i]:
                    dp[i] = dp[j - 1] + 1
                j -= 1
        return dp[m]
