from typing import List


class Solution:
    def canSortArray(self, nums: List[int]) -> bool:
        previous_max = 0
        current_max = 0
        current_bits = 0
        for value in nums:
            bits = value.bit_count()
            if bits != current_bits:
                previous_max = current_max
                current_bits = bits
                current_max = 0
            if value < previous_max:
                return False
            if value > current_max:
                current_max = value
        return True
