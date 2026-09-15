from typing import List


class Solution:
    def numberOfWays(self, n: int, m: int, k: int, source: List[int], dest: List[int]) -> int:
        MOD = 1_000_000_007

        def line_counts(size, start, target):
            # a[t]: walks of t steps (each step to a different position on a
            # line of `size` cells) that end at target; b[t]: walks that end
            # anywhere else. A step into target can come from any other
            # position; a step elsewhere has size - 1 options from target
            # and size - 2 from any other position.
            a = [0] * (k + 1)
            b = [0] * (k + 1)
            a[0] = 1 if start == target else 0
            b[0] = 1 - a[0]
            off_by_one, off_by_two = (size - 1) % MOD, (size - 2) % MOD
            for t in range(k):
                a[t + 1] = b[t]
                b[t + 1] = (a[t] * off_by_one + b[t] * off_by_two) % MOD
            return a

        # Factorials for choosing which of the k moves change x.
        fact = [1] * (k + 1)
        for i in range(1, k + 1):
            fact[i] = fact[i - 1] * i % MOD
        inv_fact = [1] * (k + 1)
        inv_fact[k] = pow(fact[k], MOD - 2, MOD)
        for i in range(k, 0, -1):
            inv_fact[i - 1] = inv_fact[i] * i % MOD

        # A move keeps one coordinate fixed, so x and y evolve independently:
        # with i of the k moves changing x, the x-walk has i steps, the
        # y-walk k - i steps, and their interleavings number C(k, i).
        ax = line_counts(n, source[0], dest[0])
        ay = line_counts(m, source[1], dest[1])
        ans = 0
        for i in range(k + 1):
            comb = fact[k] * inv_fact[i] % MOD * inv_fact[k - i] % MOD
            ans = (ans + comb * ax[i] % MOD * ay[k - i]) % MOD
        return ans
