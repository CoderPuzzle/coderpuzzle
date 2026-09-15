from typing import Dict, List


class Solution:
    def findValidSplit(self, nums: List[int]) -> int:
        # Coprimality of the two products is decided by shared prime
        # factors, never by the products themselves: with n up to 10^4
        # and values up to 10^6, both sides reach thousands of digits.
        # Boundary i works exactly when no prime occurs on both sides,
        # i.e. no prime's occurrence span [first, last] straddles i
        # (first <= i < last). A smallest-prime-factor sieve factorizes
        # every element in O(log value), first/last per prime mark the
        # straddling spans on a difference array, and the first
        # unblocked boundary of [0, n - 2] is the answer.
        top = max(nums)
        spf = list(range(top + 1))
        d = 2
        while d * d <= top:
            if spf[d] == d:
                for multiple in range(d * d, top + 1, d):
                    if spf[multiple] == multiple:
                        spf[multiple] = d
            d += 1

        def primes_of(x: int) -> List[int]:
            out = []
            while x > 1:
                p = spf[x]
                out.append(p)
                while x % p == 0:
                    x //= p
            return out

        n = len(nums)
        first: Dict[int, int] = {}
        last: Dict[int, int] = {}
        for index, value in enumerate(nums):
            for prime in primes_of(value):
                first.setdefault(prime, index)
                last[prime] = index
        blocked = [0] * (n + 1)
        for prime, lo in first.items():
            hi = min(last[prime] - 1, n - 2)
            if lo <= hi:
                blocked[lo] += 1
                blocked[hi + 1] -= 1
        running = 0
        for i in range(n - 1):
            running += blocked[i]
            if running == 0:
                return i
        return -1
