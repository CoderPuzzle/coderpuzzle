from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Sieve of Eratosthenes up to a fixed bound. Every nums[i] is at
        # most 1e5, and the largest prime gap below 1e5 is far smaller
        # than the margin, so the next prime (or next non-prime) after any
        # element always lies inside the table.
        limit = 300000
        is_prime = [True] * (limit + 1)
        is_prime[0] = is_prime[1] = False
        for p in range(2, int(limit**0.5) + 1):
            if is_prime[p]:
                for multiple in range(p * p, limit + 1, p):
                    is_prime[multiple] = False

        total = 0
        for i, x in enumerate(nums):
            if i % 2 == 0:
                # Even index needs a prime: walk up to the first one.
                while not is_prime[x]:
                    x += 1
            else:
                # Odd index needs a non-prime: walk up to the first one.
                while is_prime[x]:
                    x += 1
            total += x - nums[i]
        return total
