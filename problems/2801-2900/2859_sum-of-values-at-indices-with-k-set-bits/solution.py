from typing import List


class Solution:
    def sumIndicesWithKSetBits(self, nums: List[int], k: int) -> int:
        answer = 0
        for index, value in enumerate(nums):
            set_bits = 0
            rest = index
            while rest:
                rest &= rest - 1
                set_bits += 1
            if set_bits == k:
                answer += value
        return answer
