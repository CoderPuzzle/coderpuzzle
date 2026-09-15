from typing import List, Optional


class Solution:
    def minMaxSums(self, nums: List[int], k: int) -> int:
        # After sorting, nums[i] is the maximum of exactly those
        # subsequences whose other members come from the i smaller
        # entries: summed over sizes 1..k that is g(i) = sum_{j < k} C(i, j)
        # subsequences, and symmetrically it is the minimum of g(n-1-i)
        # of them (the larger entries). So the answer is
        # sum nums[i] * (g(i) + g(n-1-i)) mod 10^9 + 7. Each partial row
        # sum rolls in O(1): Pascal gives C(i, j) = C(i-1, j) + C(i-1, j-1),
        # so g(i) = 2*g(i-1) - C(i-1, k-1), one binomial per step from
        # factorial tables. n <= 10^5 keeps those tables small; residues
        # multiply past 32 bits but stay exact on Python integers.
        mod = 1_000_000_007
        nums = sorted(nums)
        n = len(nums)

        fact = [1] * n
        for i in range(1, n):
            fact[i] = fact[i - 1] * i % mod
        inv_fact = [1] * n
        inv_fact[n - 1] = pow(fact[n - 1], mod - 2, mod)
        for i in range(n - 1, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % mod

        def choose(a: int, b: int) -> int:
            if b < 0 or b > a:
                return 0
            return fact[a] * inv_fact[b] % mod * inv_fact[a - b] % mod

        g = [0] * n
        g[0] = 1
        for i in range(1, n):
            g[i] = (2 * g[i - 1] - choose(i - 1, k - 1)) % mod

        total = 0
        for i, value in enumerate(nums):
            total = (total + value % mod * (g[i] + g[n - 1 - i])) % mod
        return total
