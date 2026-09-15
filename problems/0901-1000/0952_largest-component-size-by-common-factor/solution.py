from typing import List


class Solution:
    def largestComponentSize(self, nums: List[int]) -> int:
        # Two values land in one component exactly when a chain of shared
        # prime factors links them: sharing a factor greater than 1 means
        # sharing a prime, and every path in the graph alternates values
        # with the primes they share. A smallest-prime-factor sieve up to
        # the largest value factorizes each number in a handful of
        # divisions, a union-find keyed by factor unions every value with
        # each of its primes, and the largest class counted over the
        # values is the answer — the value 1, having no prime factor,
        # stays a singleton.
        m = max(nums)
        spf = list(range(m + 1))
        i = 2
        while i * i <= m:
            if spf[i] == i:
                for j in range(i * i, m + 1, i):
                    if spf[j] == j:
                        spf[j] = i
            i += 1

        parent = list(range(m + 1))
        size = [1] * (m + 1)

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        for v in nums:
            x = v
            while x > 1:
                p = spf[x]
                union(v, p)
                while x % p == 0:
                    x //= p

        counts = {}
        best = 0
        for v in nums:
            r = find(v)
            counts[r] = counts.get(r, 0) + 1
            if counts[r] > best:
                best = counts[r]
        return best
