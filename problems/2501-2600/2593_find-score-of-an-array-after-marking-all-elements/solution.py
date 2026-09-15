from typing import List


class Solution:
    def findScore(self, nums: List[int]) -> int:
        # Visit candidates in (value, index) order once; the first
        # not-yet-marked visit of each position is exactly the statement's
        # "smallest unmarked, smallest index" pick, and its neighborhood is
        # marked on the spot, so later sorted candidates skip it naturally.
        # Chosen indices are pairwise non-adjacent, so at most ceil(n / 2)
        # values of up to 10^6 are summed — under 5 * 10^10, which needs 64
        # bits but stays exact as a JS double too.
        n = len(nums)
        marked = [False] * n
        order = sorted(range(n), key=lambda i: nums[i])
        score = 0
        for i in order:
            if marked[i]:
                continue
            score += nums[i]
            marked[i] = True
            if i > 0:
                marked[i - 1] = True
            if i + 1 < n:
                marked[i + 1] = True
        return score
