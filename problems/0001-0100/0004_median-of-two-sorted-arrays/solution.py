from typing import List, Optional


class Solution:
    def findMedianSortedArrays(self, nums1: List[int], nums2: List[int]) -> float:
        # Keep nums1 as the shorter array: smaller search space, and the
        # partner cut j is guaranteed to land inside [0, n].
        if len(nums1) > len(nums2):
            nums1, nums2 = nums2, nums1
        m, n = len(nums1), len(nums2)
        total = m + n
        half = total // 2
        lo, hi = 0, m
        while True:
            # Binary-search the cut: i = elements nums1 gives to the left
            # half; the cut in nums2 is then forced by the half's size.
            i = (lo + hi) // 2
            j = half - i
            # Sentinels make edge cuts well-defined: a cut at 0 or past the
            # end needs no special casing.
            a_left = nums1[i - 1] if i > 0 else float("-inf")
            a_right = nums1[i] if i < m else float("inf")
            b_left = nums2[j - 1] if j > 0 else float("-inf")
            b_right = nums2[j] if j < n else float("inf")
            # Both arrays are sorted, so comparing across the cut suffices:
            # everything on the left is <= everything on the right.
            if a_left <= b_right and b_left <= a_right:
                if total % 2:
                    # Odd total: the left half was made the smaller side.
                    return float(min(a_right, b_right))
                return (max(a_left, b_left) + min(a_right, b_right)) / 2
            if a_left > b_right:
                # nums1 is contributing too many elements to the left half.
                hi = i - 1
            else:
                lo = i + 1
