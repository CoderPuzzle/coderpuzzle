from typing import List


class Solution:
    def mergeArrays(self, nums1: List[List[int]], nums2: List[List[int]]) -> List[List[int]]:
        # Both inputs are sorted by id, so two pointers walk them in
        # lockstep, always emitting the smaller head id next: shared ids
        # merge their values, single-side ids pass through unchanged. The
        # result is sorted by construction and holds each id once.
        merged = []
        i = j = 0
        while i < len(nums1) and j < len(nums2):
            if nums1[i][0] == nums2[j][0]:
                merged.append([nums1[i][0], nums1[i][1] + nums2[j][1]])
                i += 1
                j += 1
            elif nums1[i][0] < nums2[j][0]:
                merged.append(list(nums1[i]))
                i += 1
            else:
                merged.append(list(nums2[j]))
                j += 1
        # One tail is empty here; the other carries its remaining rows.
        merged.extend(row[:] for row in nums1[i:])
        merged.extend(row[:] for row in nums2[j:])
        return merged
