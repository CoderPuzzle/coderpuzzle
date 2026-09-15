from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def countElements(self, nums: List[int], k: int) -> int:
        # Sorting lines every element up with its rank: the elements
        # strictly greater than a value are exactly the sorted suffix after
        # that value's run. The whole count hangs on one threshold, the
        # value at sorted index t = n - k - 1.
        ordered = sorted(nums)
        n = len(ordered)
        threshold = ordered[n - k - 1]
        # Elements strictly below the threshold all qualify: their runs end
        # before it. The run AT the threshold qualifies only when its last
        # member still sees >= k strictly greater values, i.e. the run ends
        # at or before t. Values above the threshold never qualify.
        left = bisect_left(ordered, threshold)
        right = bisect_right(ordered, threshold)
        if n - 1 - (right - 1) >= k:
            return right
        return left
