from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def minInversionCount(self, nums: List[int], k: int) -> int:
        # Keep the current window as a sorted list. A sorted list makes the
        # slide's two rank questions direct array searches: the position an
        # element occupies IS the number of elements smaller than it, and
        # the gap it is dropped into counts the elements greater than it.
        # The running inversion count moves by the same two terms the
        # Fenwick tree tracks, but each term is read off one bisection — no
        # tree, no compression, and the window itself stays materialized.
        #
        # Equal values need care at both ends: removing uses leftmost
        # position so exactly one copy leaves, inserting uses rightmost
        # position so the newcomer lands after its equals and only pairs
        # with strictly larger survivors.
        window: List[int] = []
        inversions = 0
        for x in nums[:k]:
            pos = bisect_right(window, x)
            window.insert(pos, x)
            inversions += len(window) - 1 - pos
        best = inversions
        for right in range(k, len(nums)):
            out = nums[right - k]
            incoming = nums[right]
            po = bisect_left(window, out)
            window.pop(po)
            inversions -= po
            pi = bisect_right(window, incoming)
            window.insert(pi, incoming)
            inversions += len(window) - 1 - pi
            if inversions < best:
                best = inversions
        return best
