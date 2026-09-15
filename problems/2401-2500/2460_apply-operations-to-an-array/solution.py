from typing import List


class Solution:
    def applyOperations(self, nums: List[int]) -> List[int]:
        # Phase 1: apply the n-1 operations left to right; doubling an
        # element zeroes its right neighbor, which the next comparison sees.
        result = list(nums)
        for i in range(len(result) - 1):
            if result[i] == result[i + 1]:
                result[i] *= 2
                result[i + 1] = 0
        # Phase 2: stable-compact non-zero values to the front, then pad.
        write = 0
        for value in result:
            if value != 0:
                result[write] = value
                write += 1
        for i in range(write, len(result)):
            result[i] = 0
        return result
