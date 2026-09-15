from typing import List, Optional


class Solution:
    def getPermutationIndex(self, perm: List[int]) -> int:
        MOD = 1_000_000_007
        n = len(perm)
        # fact[i] = i!; position i's Lehmer digit weighs (n - 1 - i)!
        fact = [1] * n
        for i in range(1, n):
            fact[i] = fact[i - 1] * i % MOD

        # Fenwick tree over values 1..n tracks which values are still unused
        tree = [0] * (n + 1)

        def add(i, delta):
            while i <= n:
                tree[i] += delta
                i += i & -i

        def query(i):
            s = 0
            while i > 0:
                s += tree[i]
                i -= i & -i
            return s

        for v in range(1, n + 1):
            add(v, 1)

        ans = 0
        for i, x in enumerate(perm):
            # Lehmer digit: how many unused values are smaller than perm[i]
            smaller = query(x - 1)
            # each such value placed here leads (n - 1 - i)! earlier permutations
            ans = (ans + smaller * fact[n - 1 - i]) % MOD
            # perm[i] is spent; later positions see only the remaining values
            add(x, -1)
        return ans
