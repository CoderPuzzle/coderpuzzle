from typing import List


class Solution:
    def maxScore(self, nums: List[int], x: int) -> int:
        unseen = -(1 << 60)
        best = [unseen, unseen]
        best[nums[0] % 2] = nums[0]

        for value in nums[1:]:
            parity = value % 2
            extended = best[parity] + value
            switched = best[parity ^ 1] + value - x
            best[parity] = max(extended, switched)

        return max(best)
