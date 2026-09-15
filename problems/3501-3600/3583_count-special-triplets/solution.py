from typing import List


class Solution:
    def specialTriplets(self, nums: List[int]) -> int:
        # Sweep the middle index j while keeping counts of every value
        # strictly left and strictly right of it: j with v = nums[j]
        # contributes left[2v] * right[2v]. Per-index counts fit in 32
        # bits, but the product reaches 2.5 * 10^9 and the total up to
        # C(10^5, 3) ≈ 1.7 * 10^14, so the modulo waits for the end.
        right = [0] * 200001
        for x in nums:
            right[x] += 1
        left = [0] * 200001
        ans = 0
        for v in nums:
            right[v] -= 1
            ans += left[2 * v] * right[2 * v]
            left[v] += 1
        return ans % 1_000_000_007
