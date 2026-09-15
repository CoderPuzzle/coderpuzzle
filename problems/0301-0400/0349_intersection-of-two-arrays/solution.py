from typing import List


class Solution:
    def intersection(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # The set does the uniqueness bookkeeping: hashing nums1's values
        # answers "is this value shared?" in O(1) average, and collecting
        # the hits into a second set collapses the duplicates both inputs
        # carry, so each shared value is kept exactly once. Sorting the
        # distinct survivors at the end emits the ascending order this
        # judge pins on the original's any-order freedom.
        seen = set(nums1)
        shared = set()
        for value in nums2:
            if value in seen:
                shared.add(value)
        return sorted(shared)
