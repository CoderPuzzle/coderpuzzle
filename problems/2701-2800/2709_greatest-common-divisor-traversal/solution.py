from typing import List, Optional


class Solution:
    def canTraverseAllPairs(self, nums: List[int]) -> bool:
        n = len(nums)
        if n == 1:
            return True
        # 1 has no prime factors, so it can never share an edge.
        if 1 in nums:
            return False

        # Sieve smallest prime factors once so any value decomposes into its
        # distinct primes by repeated SPF division.
        maxv = max(nums)
        spf = list(range(maxv + 1))
        i = 2
        while i * i <= maxv:
            if spf[i] == i:
                for j in range(i * i, maxv + 1, i):
                    if spf[j] == j:
                        spf[j] = i
            i += 1

        parent = list(range(n))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        last = {}
        for i, x in enumerate(nums):
            # Split x into distinct primes; each prime is a hub chaining its
            # indices: union against the previous claimer, then take
            # ownership — consecutive links keep a prime's indices mutually
            # connected with linearly many unions instead of quadratic.
            primes = set()
            v = x
            while v > 1:
                p = spf[v]
                primes.add(p)
                while v % p == 0:
                    v //= p
            for p in primes:
                if p in last:
                    union(i, last[p])
                last[p] = i

        # All indices mutually reachable iff one union-find component holds
        # them all.
        root = find(0)
        return all(find(i) == root for i in range(1, n))
