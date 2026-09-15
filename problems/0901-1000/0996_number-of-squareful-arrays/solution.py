from math import isqrt
from typing import List


class Solution:
    def numSquarefulPerms(self, nums: List[int]) -> int:
        # Equal values are interchangeable, so a permutation is decided by
        # how many copies of each distinct value land at each step — collapse
        # nums to distinct values with multiplicities, precompute which value
        # pairs sum to a perfect square (pair sums reach 2 * 10^9, so the
        # root must be an exact isqrt, never a bare float), and depth-first
        # search: extend a partial sequence only through adjacent values that
        # are still in stock; a branch consuming all n elements is one
        # squareful permutation.
        values = sorted(set(nums))
        counts = [nums.count(v) for v in values]
        d = len(values)
        adj = [[isqrt(a + b) ** 2 == a + b for b in values] for a in values]
        n = len(nums)

        def walk(prev: int, left: int) -> int:
            if left == 0:
                return 1
            total = 0
            for j in range(d):
                if counts[j] and adj[prev][j]:
                    counts[j] -= 1
                    total += walk(j, left - 1)
                    counts[j] += 1
            return total

        answer = 0
        for start in range(d):
            counts[start] -= 1
            answer += walk(start, n - 1)
            counts[start] += 1
        return answer
