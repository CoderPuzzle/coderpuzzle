from operator import eq


class Solution:
    def maximumMatchingIndices(self, nums1: List[int], nums2: List[int]) -> int:
        # After k right shifts of nums1, index j matches iff
        # nums1[(j - k) % n] == nums2[j], so comparing nums1[i] against the
        # rotated view nums2[(i + k) % n] counts shift k's matches without
        # materializing the shifted array. The row comparison runs at C
        # speed via map(eq) over the sliced rotation; n <= 3000 keeps the
        # full O(n^2) sweep at ~9M comparisons.
        n = len(nums1)
        best = 0
        for k in range(n):
            count = sum(map(eq, nums1, nums2[k:] + nums2[:k]))
            if count > best:
                best = count
                if best == n:
                    break
        return best
