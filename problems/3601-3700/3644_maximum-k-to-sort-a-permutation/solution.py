from typing import List, Optional


class Solution:
    def sortPermutation(self, nums: List[int]) -> int:
        # A displaced value must take part in a swap, and every swap it
        # joins pins k inside that value's bits, so no k can exceed the AND
        # of the displaced values themselves.
        ans = -1  # all bits set: the AND identity
        for i, x in enumerate(nums):
            if x != i:
                ans &= x
        # Sorting displaces nothing; the untouched sentinel clamps to the
        # required 0, and a real AND over values below n never goes negative.
        return max(ans, 0)
