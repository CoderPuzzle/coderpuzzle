class Solution:
    def minProductSum(self, nums1: List[int], nums2: List[int]) -> int:
        # Rearrangement inequality: ascending x descending pairing minimizes
        # the sum of products over all rearrangements of nums1.
        return sum(a * b for a, b in zip(sorted(nums1), sorted(nums2, reverse=True)))
