from bisect import bisect_left
from typing import List


class Solution:
    def gcdValues(self, nums: List[int], queries: List[int]) -> List[int]:
        max_value = max(nums)
        freq = [0] * (max_value + 1)
        for value in nums:
            freq[value] += 1
        # Mobius function over [1, max_value] from a linear sieve: mu[1] = 1,
        # mu[n] = 0 once a squared prime divides n, else (-1)^omega(n).
        mu = [0] * (max_value + 1)
        mu[1] = 1
        sieved = [False] * (max_value + 1)
        primes = []
        for i in range(2, max_value + 1):
            if not sieved[i]:
                primes.append(i)
                mu[i] = -1
            for prime in primes:
                if prime > max_value // i:
                    break
                sieved[i * prime] = True
                if i % prime == 0:
                    mu[i * prime] = 0
                    break
                mu[i * prime] = -mu[i]
        # count[d]: elements divisible by d, the divisor sum of the value
        # frequencies; pairs[d] = count[d] choose 2 counts every pair whose
        # gcd is a multiple of d. Mobius inversion weighs those sums with mu
        # so the proper multiples cancel: exact[d] = sum of mu[k] * pairs[d*k].
        count = [0] * (max_value + 1)
        for d in range(1, max_value + 1):
            total = 0
            for multiple in range(d, max_value + 1, d):
                total += freq[multiple]
            count[d] = total
        pairs = [0] * (max_value + 1)
        for d in range(1, max_value + 1):
            pairs[d] = count[d] * (count[d] - 1) // 2
        exact = [0] * (max_value + 1)
        for d in range(1, max_value + 1):
            total = 0
            for k in range(1, max_value // d + 1):
                total += mu[k] * pairs[d * k]
            exact[d] = total
        prefix = [0] * (max_value + 1)
        running = 0
        for d in range(1, max_value + 1):
            running += exact[d]
            prefix[d] = running
        # Query indices reach n * (n - 1) / 2 - 1 ~= 5 * 10^9, past i32:
        # they arrive as 64-bit values. Each answer is a gcd, at most 5 * 10^4.
        return [bisect_left(prefix, q + 1) for q in queries]
