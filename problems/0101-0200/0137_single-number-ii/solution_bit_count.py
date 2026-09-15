from typing import List


class Solution:
    def singleNumber(self, nums: List[int]) -> int:
        result = 0
        for i in range(32):
            # Triples contribute 0 or 3 set bits at position i (a multiple of
            # three); the unique value contributes 0 or 1 — so count % 3 is
            # exactly bit i of the answer.
            count = 0
            for value in nums:
                count += (value >> i) & 1
            if count % 3 != 0:
                result |= 1 << i
        # Python integers are unbounded: reinterpret a pattern with bit 31 set
        # as the intended negative 32-bit value.
        if result >= 1 << 31:
            result -= 1 << 32
        return result
