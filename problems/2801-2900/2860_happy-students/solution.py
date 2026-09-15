from typing import List


class Solution:
    def countWays(self, nums: List[int]) -> int:
        # In a group of size k every selected student needs nums[i] < k and
        # every unselected one nums[i] > k, so a size-k group exists exactly
        # when k values lie strictly below k and none equals k: the whole
        # selection is forced onto the below-k values and everyone else
        # clears k. Sorted ascending, values[k - 1] < k certifies that the
        # first k values are exactly the ones below k, and values[k] > k
        # that nothing sits on or crosses k. Sizes 0..n cover every subset
        # shape, so counting the passing sizes counts the selections.
        values = sorted(nums)
        n = len(values)
        ways = 0
        for k in range(n + 1):
            if (k == 0 or values[k - 1] < k) and (k == n or values[k] > k):
                ways += 1
        return ways
