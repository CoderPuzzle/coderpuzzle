from typing import List


class Solution:
    def maximizeXorAndXor(self, nums: List[int]) -> int:
        # Enumerate the AND-subset B over all 2^n masks. Two subset tables
        # give AND(B) (all-ones identity, read as 0 for the empty subset
        # per the statement) and XOR(B). With s = XOR of the pool (indices
        # outside B), the best A/C split maximizes x + (s ^ x) over subset
        # XORs x of the pool, and x + (s ^ x) = s + 2 * (x & ~s), so a
        # linear basis over the pool values masked with ~s answers it
        # greedily from the top bit. `and(B) + s + 2 * (~s & MASK)` is an
        # upper bound: once the incumbent is strong it prunes most subsets
        # before any basis work. Values < 2^30 keep every term inside 30
        # bits; sums reach ~3.2e9, so 64-bit accumulation is required.
        n = len(nums)
        size = 1 << n
        full = (1 << 30) - 1
        and_dp = [0] * size
        and_dp[0] = full  # AND identity; the empty subset reads as 0 below
        xor_dp = [0] * size
        for subset in range(1, size):
            low = subset & -subset
            j = low.bit_length() - 1
            and_dp[subset] = and_dp[subset ^ low] & nums[j]
            xor_dp[subset] = xor_dp[subset ^ low] ^ nums[j]
        total = xor_dp[size - 1]
        best = 0
        for b in range(size):
            s = total ^ xor_dp[b]
            t = ~s & full
            and_b = 0 if b == 0 else and_dp[b]
            if and_b + s + 2 * t <= best:
                continue
            inv = ~s
            basis = [0] * 30
            for j in range(n):
                if b >> j & 1:
                    continue
                w = nums[j] & inv
                while w:
                    p = w.bit_length() - 1
                    top = basis[p]
                    if top:
                        w ^= top
                    else:
                        basis[p] = w
                        break
            x = 0
            for p in range(29, -1, -1):
                if basis[p] and not x >> p & 1:
                    x ^= basis[p]
            val = and_b + s + 2 * x
            if val > best:
                best = val
        return best
