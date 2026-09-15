from typing import List


class Solution:
    def diagonalPrime(self, nums: List[List[int]]) -> int:
        # Only the two diagonals can contribute, so walk both index legs
        # once and keep the largest value that survives a primality test.
        # Trial division by 2 and then odd factors up to sqrt(value) caps
        # each check near 2000 steps, since values never exceed 4*10^6.
        def is_prime(value: int) -> bool:
            if value < 2:
                return False
            if value % 2 == 0:
                return value == 2
            factor = 3
            while factor * factor <= value:
                if value % factor == 0:
                    return False
                factor += 2
            return True

        best = 0
        size = len(nums)
        for i in range(size):
            if is_prime(nums[i][i]) and nums[i][i] > best:
                best = nums[i][i]
            if is_prime(nums[i][size - 1 - i]) and nums[i][size - 1 - i] > best:
                best = nums[i][size - 1 - i]
        return best
