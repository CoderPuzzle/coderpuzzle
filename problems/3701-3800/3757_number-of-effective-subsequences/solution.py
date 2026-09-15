from typing import List

MOD = 10**9 + 7


class Solution:
    def countEffective(self, nums: List[int]) -> int:
        # A removal strictly decreases the OR exactly when it takes away
        # every element carrying at least one set bit of the total. For a
        # non-empty bit set S, the subsequences removing all occurrences of
        # every bit in S are counted by 2^free(S), where free(S) is the
        # number of elements carrying no bit of S (they alone are optional).
        # Inclusion-exclusion over S turns those counts into the number of
        # subsequences killing at least one bit.
        n = len(nums)
        total = 0
        for x in nums:
            total |= x
        # At most 20 bits live under 10^6; compress them to low positions.
        bits = [b for b in range(20) if (total >> b) & 1]
        k = len(bits)
        full = (1 << k) - 1
        # g[m] = how many elements compress to mask m; then h[m] = how many
        # compress to a SUBSET of m, so h[full ^ S] = free(S). Standard
        # sum-over-subsets: push each count down to its submasks.
        g = [0] * (1 << k)
        for x in nums:
            m = 0
            for i, b in enumerate(bits):
                if (x >> b) & 1:
                    m |= 1 << i
            g[m] += 1
        h = g[:]
        for b in range(k):
            bit = 1 << b
            step = bit << 1
            for base in range(0, 1 << k, step):
                for i in range(base, base + bit):
                    h[i + bit] += h[i]
        pw = [1] * (n + 1)
        for i in range(1, n + 1):
            pw[i] = pw[i - 1] * 2 % MOD
        ans = 0
        for S in range(1, 1 << k):
            term = pw[h[full ^ S]]
            if S.bit_count() & 1:
                ans = (ans + term) % MOD
            else:
                ans = (ans - term) % MOD
        return ans % MOD
