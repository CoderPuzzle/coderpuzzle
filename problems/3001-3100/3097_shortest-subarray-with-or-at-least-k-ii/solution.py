from typing import List


class Solution:
    def minimumSubarrayLength(self, nums: List[int], k: int) -> int:
        # Validity of a window is downward-closed in its left end (shrinking
        # can only drop bits) and extending r never invalidates a previously
        # valid l, so the shortest valid left end never regresses: two
        # pointers amortize. OR cannot be undone directly, so per-bit counts
        # rebuild the window OR one counter flip at a time on add/remove.
        counts = [0] * 30
        best = -1
        left = 0

        def window_or():
            v = 0
            for b in range(30):
                if counts[b]:
                    v |= 1 << b
            return v

        for right, value in enumerate(nums):
            for b in range(30):
                counts[b] += value >> b & 1
            # Shrink while the window stays special; each recorded length is
            # a candidate, and the one recorded just before the window breaks
            # is the shortest ending here.
            while left <= right and window_or() >= k:
                length = right - left + 1
                if best == -1 or length < best:
                    best = length
                leaving = nums[left]
                for b in range(30):
                    counts[b] -= leaving >> b & 1
                left += 1
        return best
