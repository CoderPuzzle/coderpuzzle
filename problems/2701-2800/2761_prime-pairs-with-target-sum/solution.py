from typing import List


class Solution:
    def findPrimePairs(self, n: int) -> List[List[int]]:
        # Sieve of Eratosthenes up to n: assume every integer >= 2 is prime,
        # then cross off each prime's multiples in one C-level slice stroke.
        # Any composite has a factor <= its square root, so i * i is where
        # the crossing-off starts.
        is_prime = bytearray([1]) * (n + 1)
        is_prime[0] = is_prime[1] = 0
        i = 2
        while i * i <= n:
            if is_prime[i]:
                is_prime[i * i :: i] = bytearray(len(range(i * i, n + 1, i)))
            i += 1
        # Scan the smaller endpoint only: x <= n // 2 forces y = n - x >= x,
        # so every pair appears once, and ascending x gives the required
        # order for free. The smallest prime pair sums to 2 + 2 = 4, so any
        # n below that leaves the list empty.
        return [[x, n - x] for x in range(2, n // 2 + 1) if is_prime[x] and is_prime[n - x]]
