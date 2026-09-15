class Solution:
    def maxDistance(self, nums1: List[int], nums2: List[int]) -> int:
        # Two pointers: as i grows, nums1[i] shrinks, so the farthest usable
        # j never moves left. Advance j as far as validity allows.
        best = 0
        j = 0
        n1, n2 = len(nums1), len(nums2)
        for i in range(n1):
            while j < n2 and (j < i or nums2[j] >= nums1[i]):
                j += 1
            if j > i and nums2[j - 1] >= nums1[i]:
                best = max(best, j - 1 - i)
        return best
