from typing import List, Optional


class Solution:
    def divisibleTripletCount(self, nums: List[int], d: int) -> int:
        # A triplet sum is divisible by d exactly when a middle element's
        # remainder completes the outer two: fix the left index L, sweep R
        # forward keeping remainder counts of the elements strictly between
        # them, and each lookup of the needed remainder counts every such
        # middle at once. Each triplet is counted once, at its outer pair.
        count = 0
        n = len(nums)
        for i in range(n):
            between = {}
            for j in range(i + 1, n):
                need = (d - (nums[i] + nums[j]) % d) % d
                count += between.get(need, 0)
                between[nums[j] % d] = between.get(nums[j] % d, 0) + 1
        return count
