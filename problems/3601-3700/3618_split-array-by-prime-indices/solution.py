from typing import List


class Solution:
    def splitArray(self, nums: List[int]) -> int:
        # Sieve of Eratosthenes marks which indices are prime in
        # O(n log log n); a single pass then routes each element to A or B.
        n = len(nums)
        is_prime = [True] * n
        if n > 0:
            is_prime[0] = False
        if n > 1:
            is_prime[1] = False
        for p in range(2, int(n**0.5) + 1):
            if is_prime[p]:
                for multiple in range(p * p, n, p):
                    is_prime[multiple] = False

        sum_a = 0
        sum_b = 0
        for index, value in enumerate(nums):
            if is_prime[index]:
                sum_a += value
            else:
                sum_b += value
        # |sum(A) - sum(B)| can reach ~1e14, beyond 32 bits, so the sums stay
        # in unbounded Python ints throughout.
        return abs(sum_a - sum_b)
