from bisect import bisect_right
from typing import List


class Solution:
    def primeSubOperation(self, nums: List[int]) -> bool:
        # Sieve once up to max(nums): every usable prime sits below
        # nums[i]. Greedy left to right, keeping prev = smallest feasible
        # prefix end — a smaller prefix end never constrains later elements
        # more, so committing greedily stays optimal.
        limit = max(nums)
        is_prime = [False, False] + [True] * (limit - 1)
        for i in range(2, int(limit**0.5) + 1):
            if is_prime[i]:
                is_prime[i * i :: i] = [False] * len(is_prime[i * i :: i])
        primes = [i for i in range(2, limit + 1) if is_prime[i]]
        prev = 0
        for x in nums:
            # Want the largest prime p with p < x and x - p > prev, which is
            # the largest p <= x - prev - 1 (always < x). Subtracting it then
            # beats leaving x untouched, since the result is smaller yet still
            # above prev.
            index = bisect_right(primes, x - prev - 1) - 1
            if index >= 0:
                prev = x - primes[index]
            elif x > prev:
                prev = x
            else:
                return False
        return True
