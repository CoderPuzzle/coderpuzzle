from typing import List


class Solution:
    def minSubarraySort(self, nums: List[int], k: int) -> List[int]:
        # Per window (hint 2): the segment to sort ends at the last element
        # smaller than the running max before it, and starts at the first
        # element larger than the running min after it. A sorted window sets
        # neither boundary, so its answer is 0.
        n = len(nums)
        res = []
        for s in range(n - k + 1):
            e = s + k
            right, mx = -1, 0
            for i in range(s, e):
                if nums[i] < mx:
                    right = i
                else:
                    mx = nums[i]
            if right == -1:
                res.append(0)
                continue
            left, mn = 0, 10**9
            for i in range(e - 1, s - 1, -1):
                if nums[i] > mn:
                    left = i
                else:
                    mn = nums[i]
            res.append(right - left + 1)
        return res
