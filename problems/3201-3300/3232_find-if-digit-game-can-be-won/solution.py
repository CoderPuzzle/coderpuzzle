from typing import List


class Solution:
    def canAliceWin(self, nums: List[int]) -> bool:
        # Alice must swallow an entire digit class, so the two running
        # totals decide everything: singles beat doubles under one play,
        # doubles beat singles under the other.
        single = 0
        double_sum = 0
        for value in nums:
            if value < 10:
                single += value
            else:
                double_sum += value
        # An exact tie hands Bob whichever class Alice declines with an
        # equal sum, so only a strict difference wins.
        return single != double_sum
