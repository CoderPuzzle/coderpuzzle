from typing import List


class Solution:
    def checkEqualPartitions(self, nums: List[int], target: int) -> bool:
        # Enumerate every proper subset as one side; the mask's complement
        # is the other side. Products stop early once they exceed target.
        # Any element of a product-target side divides target, so an
        # indivisible element answers false immediately.
        n = len(nums)
        full = (1 << n) - 1
        if any(target % x for x in nums):
            return False

        def product_within(mask: int) -> int:
            product = 1
            for i in range(n):
                if mask >> i & 1:
                    product *= nums[i]
                    if product > target:
                        return -1
            return product

        for mask in range(1, full):
            if product_within(mask) == target and product_within(mask ^ full) == target:
                return True
        return False
