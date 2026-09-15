class Solution:
    def sumOfBlocks(self, n: int) -> int:
        # Build the blocks in order from one shared counter: block i
        # multiplies the next i consecutive integers into a product that
        # is reduced modulo 10^9 + 7 after every factor, then folds it
        # into the running total. F(n) combines the blocks using only
        # multiplication and addition, so residue arithmetic reproduces
        # F(n) mod 10^9 + 7 exactly while the astronomically large exact
        # products are never materialized.
        MOD = 1_000_000_007
        total = 0
        cur = 1
        for i in range(1, n + 1):
            prod = 1
            for _ in range(i):
                prod = prod * cur % MOD
                cur += 1
            total = (total + prod) % MOD
        return total
