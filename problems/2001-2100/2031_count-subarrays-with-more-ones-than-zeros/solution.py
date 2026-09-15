from typing import List


class Solution:
    def subarraysWithMoreOnesThanZeroes(self, nums: List[int]) -> int:
        mod = 1_000_000_007
        size = 2 * len(nums) + 3
        offset = len(nums) + 1
        bit = [0] * size

        def add(index: int) -> None:
            while index < size:
                bit[index] += 1
                index += index & -index

        def query(index: int) -> int:
            total = 0
            while index > 0:
                total += bit[index]
                index -= index & -index
            return total

        prefix = 0
        answer = 0
        add(offset)
        for value in nums:
            prefix += 1 if value == 1 else -1
            index = prefix + offset
            answer = (answer + query(index - 1)) % mod
            add(index)
        return answer
