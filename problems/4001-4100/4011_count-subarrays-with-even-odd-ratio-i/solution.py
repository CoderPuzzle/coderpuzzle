from typing import List


class Solution:
    def countRatioSubarrays(self, nums: List[int], a: int, b: int) -> int:
        # Only element parity matters. Fix the left endpoint and extend the
        # right endpoint, carrying running even/odd counts so every subarray
        # is tested exactly once with its exact counts.
        total = 0
        n = len(nums)
        for left in range(n):
            even = 0
            odd = 0
            for right in range(left, n):
                if nums[right] % 2 == 0:
                    even += 1
                else:
                    odd += 1
                # Valid iff y > 0 and x/y <= a/b; with positive denominators
                # that is exactly b*even <= a*odd.
                if odd > 0 and b * even <= a * odd:
                    total += 1
        return total
