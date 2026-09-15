from typing import List, Optional


class Solution:
    def countHillValley(self, nums: List[int]) -> int:
        # A whole run of equal neighbors shares one pair of closest
        # non-equal neighbors, so collapsing each maximal run of equal
        # values to a single representative turns "count hills and
        # valleys, once per run" into "count interior local extrema" of
        # the compressed sequence. The endpoints of the compressed
        # sequence are missing a non-equal neighbor on one side, which
        # the interior-only loop encodes exactly.
        compressed = [nums[0]]
        for value in nums[1:]:
            if value != compressed[-1]:
                compressed.append(value)
        count = 0
        for i in range(1, len(compressed) - 1):
            left, mid, right = compressed[i - 1], compressed[i], compressed[i + 1]
            if (mid > left and mid > right) or (mid < left and mid < right):
                count += 1
        return count
