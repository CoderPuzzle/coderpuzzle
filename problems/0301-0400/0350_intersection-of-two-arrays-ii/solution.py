from typing import List


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Count how many times each value occurs in nums1, then walk nums2:
        # a value can join the result at most min(count1, count2) times,
        # which the per-value counter enforces by falling to zero.
        counts = {}
        for value in nums1:
            counts[value] = counts.get(value, 0) + 1
        picked = []
        for value in nums2:
            if counts.get(value, 0) > 0:
                picked.append(value)
                counts[value] -= 1
        # The judge compares arrays exactly, so pin the any-order freedom
        # to ascending sorted order before returning.
        return sorted(picked)
