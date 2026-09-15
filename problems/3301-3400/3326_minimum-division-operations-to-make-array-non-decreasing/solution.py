from math import isqrt
from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # A division replaces a composite x by its smallest prime factor
        # (x's greatest proper divisor), and primes are stuck: their
        # greatest proper divisor is 1, so dividing leaves them unchanged.
        # Every element therefore ends as itself, or — for one operation —
        # as its smallest prime factor. Scan from the right keeping the
        # value the previous (righter) slot settled on: keep x when it
        # fits (no operation, and the loosest bound for the left
        # neighbor), otherwise divide once when the smallest prime factor
        # fits, else the array is impossible. Smallest prime factors up to
        # max(nums) come from one sieve pass; writing each prime's
        # multiples from the largest prime down leaves the smallest prime
        # on every composite.
        limit = max(nums)
        spf = list(range(limit + 1))
        root = isqrt(limit)
        small = [True] * (root + 1)
        for p in range(2, isqrt(root) + 1):
            if small[p]:
                for m in range(p * p, root + 1, p):
                    small[m] = False
        for p in range(root, 1, -1):
            if small[p]:
                start = p * p
                if start <= limit:
                    spf[start::p] = [p] * ((limit - start) // p + 1)
        ops = 0
        bound = limit + 1
        for x in reversed(nums):
            if x <= bound:
                bound = x
            elif x > 1 and spf[x] <= bound:
                ops += 1
                bound = spf[x]
            else:
                return -1
        return ops
