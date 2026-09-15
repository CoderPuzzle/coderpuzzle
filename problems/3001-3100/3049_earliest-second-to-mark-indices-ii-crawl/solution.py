import heapq
from typing import List


class Solution:
    def earliestSecondToMarkIndices(self, nums: List[int], changeIndices: List[int]) -> int:
        n = len(nums)

        def can_finish(t: int) -> bool:
            # Feasibility is monotone in the horizon, so this is probed by
            # binary search. Fewer seconds than indices can never mark them
            # all.
            if t < n:
                return False
            # First occurrence of every index within [1, t]: clearing an
            # index at its earliest chance dominates any later pin, since an
            # earlier set-second only relaxes where the mark may land.
            first = {}
            for s in range(t):
                v = changeIndices[s]
                if v not in first:
                    first[v] = s + 1
            # Sweep the pinned seconds from latest to earliest, banking each
            # clearance's saving of nums[v] - 1 seconds (one set-op replaces
            # the whole decrement chain). Every suffix of chosen clearances
            # needs distinct mark seconds after its deadline outside the
            # suffix's own pins, capping the suffix count at half the window
            # 2 * chosen <= t - f + 1; when the cap breaks at deadline f,
            # give back the banked clearance with the smallest saving.
            bank = []
            saved = 0
            chosen = 0
            for f in sorted(first.values(), reverse=True):
                c = nums[changeIndices[f - 1] - 1]
                if c < 2:
                    continue
                heapq.heappush(bank, c)
                saved += c - 1
                chosen += 1
                while 2 * chosen > t - f + 1:
                    saved -= heapq.heappop(bank) - 1
                    chosen -= 1
            # Uncleared indices keep their decrement chains; the surviving
            # work plus one mark per index must all fit into [1, t]. Values
            # reach n * 10^9, so the accounting stays exact in big ints.
            return sum(nums) + n - saved <= t

        lo, hi = 1, len(changeIndices)
        if not can_finish(hi):
            return -1
        while lo < hi:
            mid = (lo + hi) // 2
            if can_finish(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
