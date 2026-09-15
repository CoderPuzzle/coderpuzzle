from typing import List


class Solution:
    def countTriplets(self, nums: List[int]) -> int:
        # A triple's AND vanishes exactly when the first two values' AND is a
        # submask of the third value's complement. One pass over all n^2
        # ordered pairs records f[v] = pairs with nums[i] & nums[j] == v, a
        # subset zeta transform turns f into h[m] = sum of f over the
        # submasks of m, and each k then contributes h[~nums[k] & 0xFFFF].
        full = 1 << 16
        f = [0] * full
        for x in nums:
            for y in nums:
                f[x & y] += 1
        for b in range(16):
            bit = 1 << b
            for mask in range(full):
                if mask & bit:
                    f[mask] += f[mask ^ bit]
        return sum(f[~x & 0xFFFF] for x in nums)
