from typing import List, Optional


class Solution:
    def maxTotalReward(self, rewardValues: List[int]) -> int:
        # Bitset DP: bit j of dp is 1 iff total reward j is achievable.
        # Duplicates can never be reused (a second equal value would require
        # x > total >= x), so sorting + deduplication is safe.
        values = sorted(set(rewardValues))
        dp = 1
        for x in values:
            dp |= (dp & ((1 << x) - 1)) << x
        return dp.bit_length() - 1
