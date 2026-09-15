class Solution:
    def countPairs(self, nums1: List[int], nums2: List[int]) -> int:
        # d[i] = nums1[i]-nums2[i]; count pairs with d[i]+d[j] > 0 by
        # two pointers over sorted d: d[l]+d[r] > 0 means all of l+1..r-1
        # also pair with r, so add r-l and move r down.
        d = sorted(a - b for a, b in zip(nums1, nums2))
        total = 0
        l, r = 0, len(d) - 1
        while l < r:
            if d[l] + d[r] > 0:
                total += r - l
                r -= 1
            else:
                l += 1
        return total
