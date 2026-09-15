from typing import List, Optional


class Solution:
    def productExceptSelf(self, nums: List[int]) -> List[int]:
        # The product except nums[i] factors as (product of everything
        # before i) x (product of everything after i), both computable as
        # running products — no division, which zeros would break anyway.
        n = len(nums)
        # pre[i] = product of the i elements preceding index i; pre[0] = 1
        # so the prefix of the first cell is the empty product.
        pre = [1] * (n + 1)
        for i in range(n):
            pre[i + 1] = pre[i] * nums[i]
        # suf[i] = product of everything from index i onward; suf[n] = 1
        # for the same reason on the right edge.
        suf = [1] * (n + 1)
        for i in range(n - 1, -1, -1):
            suf[i] = suf[i + 1] * nums[i]
        # pre[i] x suf[i+1] spans everything except nums[i] itself; a lone
        # zero zeroes every cell but its own, automatically.
        return [pre[i] * suf[i + 1] for i in range(n)]
