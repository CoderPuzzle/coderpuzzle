from typing import List, Optional


class Solution:
    def maxNonOverlapping(self, nums: List[int], target: int) -> int:
        # `seen` holds every prefix sum reachable from the start of the
        # current "segment" (the region after the last subarray taken).
        # The moment the running sum minus `target` is in `seen`, a
        # subarray ending here sums to `target`; taking it immediately and
        # resetting (prefix sum back to 0, `seen` back to just {0}) is
        # optimal, because closing off a valid subarray as early as
        # possible never removes an opportunity a later close would have
        # had — it can only free up more room for subarrays after it.
        seen = {0}
        prefix_sum = 0
        count = 0
        for x in nums:
            prefix_sum += x
            if prefix_sum - target in seen:
                count += 1
                seen = {0}
                prefix_sum = 0
            else:
                seen.add(prefix_sum)
        return count
