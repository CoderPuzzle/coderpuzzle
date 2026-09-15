from typing import List, Optional


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # The product except nums[i] factors as (product of everything
        # before i) x (product of everything after i), both computable as
        # running products — no division, which zeros would break anyway.
        n = len(nums)
        answer = [1] * n
        # First sweep stores the running left product BEFORE folding nums[i]
        # in, so answer[i] ends up holding exactly the prefix preceding i.
        left = 1
        for i in range(n):
            answer[i] = left
            left *= nums[i]
        # Second sweep from the right: its running product likewise lags one
        # position behind, then absorbs nums[i]. Each cell becomes
        # prefix x suffix.
        right = 1
        for i in range(n - 1, -1, -1):
            answer[i] *= right
            right *= nums[i]
        # Zeros need no special casing: a lone zero zeroes every cell but its
        # own, and multiple zeros zero everything — all automatic.
        return answer
