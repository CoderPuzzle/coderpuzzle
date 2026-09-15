from typing import List, Optional


class Solution:
    def gcdSort(self, nums: List[int]) -> bool:
        MX = 100001
        # Smallest-prime-factor sieve: spf[v] lets each value be split into
        # its distinct primes by repeated division.
        spf = list(range(MX))
        i = 2
        while i * i < MX:
            if spf[i] == i:
                for j in range(i * i, MX, i):
                    if spf[j] == j:
                        spf[j] = i
            i += 1

        # Union-find over values and primes: a swap is legal when the two
        # values share a prime, and chains of swaps make any two values in
        # one component mutually reachable.
        parent = list(range(MX))

        def find(a):
            # Path halving keeps the forest shallow.
            while parent[a] != a:
                parent[a] = parent[parent[a]]
                a = parent[a]
            return a

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[ra] = rb

        # Link each value to each of its distinct primes. Indexing by value
        # (not position) automatically merges equal values across positions.
        for x in nums:
            v = x
            while v > 1:
                p = spf[v]
                union(x, p)
                while v % p == 0:
                    v //= p

        target = sorted(nums)
        # Sortable iff every element shares a component with its sorted
        # target; a position spanning two components is immovable.
        for a, b in zip(nums, target):
            if find(a) != find(b):
                return False
        return True
