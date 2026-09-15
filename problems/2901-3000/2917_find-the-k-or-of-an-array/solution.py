from typing import List


class Solution:
    def findKOr(self, nums: List[int], k: int) -> int:
        # Inputs are < 2^31, so only bit positions 0..30 can ever appear and
        # the result stays a non-negative 32-bit integer.
        result = 0
        for bit in range(31):
            # Count the elements carrying this bit; k or more set it.
            count = sum((num >> bit) & 1 for num in nums)
            if count >= k:
                result |= 1 << bit
        return result
