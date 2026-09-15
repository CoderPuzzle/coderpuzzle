from typing import List, Optional


class Solution:
    def maxProduct(self, nums: List[int]) -> int:
        # Every value fits in 20 bits, so each number doubles as its own
        # bitmask; "no common set bits" means the partner's mask is a
        # subset of this mask's complement within those 20 bits.
        width = max(nums).bit_length()
        size = 1 << width
        # dp[m] starts as the largest value whose set bits are exactly m
        # (0 when no element carries mask m).
        dp = [0] * size
        for v in nums:
            if v > dp[v]:
                dp[v] = v
        # Subset-max sweep: a mask holding bit b absorbs its b-cleared
        # twin; afterwards dp[m] is the largest value whose set bits are
        # a subset of m. The block walk visits only the masks holding b.
        for b in range(width):
            bit = 1 << b
            step = bit << 1
            for base in range(0, size, step):
                for m in range(base + bit, base + step):
                    cand = dp[m - bit]
                    if cand > dp[m]:
                        dp[m] = cand
        # A disjoint partner of v must carry a mask that is a subset of
        # FULL ^ mv, so dp holds the best partner directly. A value with
        # no disjoint partner looks up 0, which keeps the floor at 0.
        full = size - 1
        best = 0
        for v in nums:
            prod = v * dp[full ^ v]
            if prod > best:
                best = prod
        return best
