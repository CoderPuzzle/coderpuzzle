from typing import List


class Solution:
    def countNicePairs(self, nums: List[int]) -> int:
        # The condition rearranges to nums[i] - rev(nums[i]) being equal
        # on both sides, so each key pairs with every earlier equal key;
        # the running total stays under C(10^5, 2) ~ 5 * 10^9, exact in
        # Python's integers, reduced once at the end.
        MOD = 10**9 + 7
        count = {}
        total = 0
        for x in nums:
            y, r = x, 0
            while y:
                r = r * 10 + y % 10
                y //= 10
            key = x - r
            total += count.get(key, 0)
            count[key] = count.get(key, 0) + 1
        return total % MOD
