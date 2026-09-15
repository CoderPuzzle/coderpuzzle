from typing import List


class Solution:
    def countQuadruplets(self, nums: List[int]) -> int:
        # The condition rewrites to nums[a] + nums[b] == nums[d] - nums[c].
        # Sweep c left to right, and for each d > c count how many earlier
        # pairs (a, b) with b < c already sum to nums[d] - nums[c]; a map of
        # pair sums is extended by one entry per c step. Every valid
        # quadruplet is counted exactly once at its c, d pair.
        n = len(nums)
        ans = 0
        two_sum = {}
        for c in range(n):
            for a in range(c - 1):
                s = nums[a] + nums[c - 1]
                two_sum[s] = two_sum.get(s, 0) + 1
            for d in range(c + 1, n):
                ans += two_sum.get(nums[d] - nums[c], 0)
        return ans
