from typing import List


class Solution:
    def minOperations(self, nums1: List[int], nums2: List[int]) -> int:
        # Every slot i != j pays |nums1[i] - nums2[i]|, and the chosen source
        # j pays that same per-slot cost plus one append plus the distance
        # from the tail value to the span between nums1[j] and nums2[j].
        # The base sum is common to every choice, so only the tail-to-span
        # distance varies; take its minimum. Sums reach 1e10, so 64-bit.
        n = len(nums1)
        base = sum(abs(a - b) for a, b in zip(nums1, nums2))
        tail = nums2[n]
        best_gap = None
        for a, b in zip(nums1, nums2):
            lo, hi = (a, b) if a <= b else (b, a)
            if tail < lo:
                gap = lo - tail
            elif tail > hi:
                gap = tail - hi
            else:
                gap = 0
            if best_gap is None or gap < best_gap:
                best_gap = gap
        return base + 1 + best_gap
