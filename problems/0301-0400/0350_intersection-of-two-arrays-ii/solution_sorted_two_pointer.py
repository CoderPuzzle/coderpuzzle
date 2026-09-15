from typing import List


class Solution:
    def intersect(self, nums1: List[int], nums2: List[int]) -> List[int]:
        # Sort both arrays ascending, then walk them with one index each:
        # the smaller current value can no longer be matched and advances
        # alone, while equal currents are a shared copy — both advance
        # together, so every value joins exactly min(count1, count2) times.
        nums1.sort()
        nums2.sort()
        picked = []
        i = j = 0
        while i < len(nums1) and j < len(nums2):
            if nums1[i] == nums2[j]:
                picked.append(nums1[i])
                i += 1
                j += 1
            elif nums1[i] < nums2[j]:
                i += 1
            else:
                j += 1
        # The walk visits values in ascending order, so the picks leave the
        # loop already in the ascending order the judge requires.
        return picked
