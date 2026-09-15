from typing import List


class Solution:
    def maxNonDecreasingLength(self, nums1: List[int], nums2: List[int]) -> int:
        # run1/run2: longest non-decreasing run ending exactly at this index,
        # choosing nums1[i] / nums2[i]. Each transition compares against both
        # previous picks under >=, so a run may switch source arrays anywhere.
        run1 = run2 = best = 1
        for i in range(1, len(nums1)):
            nrun1 = 1
            if nums1[i] >= nums1[i - 1]:
                nrun1 = max(nrun1, run1 + 1)
            if nums1[i] >= nums2[i - 1]:
                nrun1 = max(nrun1, run2 + 1)
            nrun2 = 1
            if nums2[i] >= nums1[i - 1]:
                nrun2 = max(nrun2, run1 + 1)
            if nums2[i] >= nums2[i - 1]:
                nrun2 = max(nrun2, run2 + 1)
            run1, run2 = nrun1, nrun2
            best = max(best, nrun1, nrun2)
        return best
