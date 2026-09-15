from typing import List, Optional


class Solution:
    def numberOfGoodSubsets(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

        def mask_of(x):
            # Map a value <= 30 onto its 10-bit prime mask; -1 marks values
            # divisible by a prime square (4, 8, 9, ...) which can never sit
            # in a good subset.
            mask = 0
            for i, p in enumerate(PRIMES):
                if x % p == 0:
                    mask |= 1 << i
                    x //= p
                    if x % p == 0:
                        return -1
            return mask

        # Compress to frequencies: subsets are distinguished by index, so
        # equal values contribute multiplicity.
        count = {}
        for v in nums:
            count[v] = count.get(v, 0) + 1

        size = 1 << len(PRIMES)
        # dp[mask] = ways to pick indices whose product's prime set is
        # exactly mask -- a 0/1-knapsack over prime masks.
        dp = [0] * size
        dp[0] = 1
        for value, freq in count.items():
            if value == 1:  # empty mask; handled separately at the end
                continue
            mask = mask_of(value)
            if mask <= 0:
                continue
            # Decreasing mask order keeps one value from being used twice in
            # a subset; only disjoint states (no shared prime) may extend.
            for prev in range(size - 1, -1, -1):
                if dp[prev] and not (prev & mask):
                    dp[prev | mask] = (dp[prev | mask] + dp[prev] * freq) % MOD
        # Good subsets need at least one prime: sum every non-empty mask.
        total = sum(dp[1:]) % MOD
        ones = count.get(1, 0)
        # Each 1 freely appends to any good subset without changing the
        # product: a factor 2^count[1].
        return total * pow(2, ones, MOD) % MOD
