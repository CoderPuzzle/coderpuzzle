from typing import List, Optional


class Solution:
    def maximumSetSize(self, nums1: List[int], nums2: List[int]) -> int:
        half = len(nums1) // 2
        s1, s2 = set(nums1), set(nums2)

        # Count values unique to each side and the shared remainder.
        a = min(half, len(s1 - s2))
        b = min(half, len(s2 - s1))

        # Each side spends its slots on unique values first; leftover slots
        # add at most one new element each, and only common values qualify,
        # each counting once no matter which side inserts it.
        return a + b + min(len(s1 & s2), len(nums1) - a - b)
