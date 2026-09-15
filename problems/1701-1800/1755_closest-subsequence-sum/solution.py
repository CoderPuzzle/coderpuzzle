from typing import List, Optional
from bisect import bisect_left


def _subset_sums(arr):
    # Doubling: each value extends the list with a shifted copy of itself,
    # turning t sums into 2t (0 included, so the empty set is covered).
    sums = [0]
    for value in arr:
        sums = sums + [s + value for s in sums]
    return sums


class Solution:
    def minAbsDifference(self, nums: List[int], goal: int) -> int:
        # Meet in the middle: 2^40 is hopeless, but two halves of <= 20
        # elements enumerate ~10^6 sums each, and every subsequence sum is
        # sL + sR with one part from each side.
        half = len(nums) // 2
        left = sorted(_subset_sums(nums[:half]))
        right = _subset_sums(nums[half:])
        best = None
        for s in right:
            # The best partner is the left sum nearest goal - s; anything
            # other than the floor and ceiling around the insertion point
            # lies strictly farther away.
            need = goal - s
            idx = bisect_left(left, need)
            for j in (idx - 1, idx):
                if 0 <= j < len(left):
                    diff = abs(left[j] + s - goal)
                    if best is None or diff < best:
                        best = diff
        return best
