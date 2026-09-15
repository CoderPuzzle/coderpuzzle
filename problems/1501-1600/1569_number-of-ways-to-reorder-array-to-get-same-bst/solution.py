import sys
from typing import List

MOD = 10**9 + 7


class Solution:
    def numOfWays(self, nums: List[int]) -> int:
        # A skewed 1000-element chain nests over 1000 calls, past CPython's
        # default recursion limit; lift it so the recursion stays the answer.
        sys.setrecursionlimit(10000)

        n = len(nums)
        # Factorials and their modular inverses (Fermat's little theorem:
        # 10**9 + 7 is prime, so inv(k!) == (k!)**(MOD - 2) mod MOD) answer
        # every C(a, b) query in O(1).
        fact = [1] * (n + 1)
        for i in range(1, n + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (n + 1)
        inv_fact[n] = pow(fact[n], MOD - 2, MOD)
        for i in range(n, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD

        def comb(a: int, b: int) -> int:
            return fact[a] * inv_fact[b] % MOD * inv_fact[a - b] % MOD

        # ways(arr) counts every reordering of arr (including arr itself)
        # that builds the same BST: split at the root arr[0], recurse on
        # the smaller-than-root and larger-than-root runs (each must keep
        # its own relative order), then multiply by the number of ways to
        # interleave the two runs into one sequence of their combined
        # length, which is the binomial coefficient of the two run sizes.
        def ways(arr: List[int]) -> int:
            if len(arr) <= 1:
                return 1
            root = arr[0]
            left = [x for x in arr[1:] if x < root]
            right = [x for x in arr[1:] if x > root]
            return comb(len(left) + len(right), len(left)) * ways(left) % MOD * ways(right) % MOD

        # The problem excludes the original array from the count.
        return (ways(nums) - 1) % MOD
