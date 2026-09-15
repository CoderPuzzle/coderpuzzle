from typing import List


class Solution:
    def magicalSum(self, m: int, k: int, nums: List[int]) -> int:
        # Forward DP over the indices of nums. State (j, b, mask) after a
        # prefix of indices: j sequence slots filled, b set bits of the sum
        # already finalized (every bit below the current index is fixed,
        # since later terms only add multiples of 2^i), and mask = partial
        # sum >> i, the carry window of not-yet-settled high bits (< 2^5).
        MOD = 10**9 + 7
        n = len(nums)
        # comb[a][c]: ways to scatter c copies of index i into the a = m - j
        # sequence slots still unassigned.
        comb = [[0] * (m + 1) for _ in range(m + 1)]
        for a in range(m + 1):
            comb[a][0] = 1
            for c in range(1, a + 1):
                comb[a][c] = (comb[a - 1][c - 1] + comb[a - 1][c]) % MOD
        # pw[i][c] = nums[i]^c mod MOD: product weight of c copies of i.
        pw = [[1] * (m + 1) for _ in range(n)]
        for i in range(n):
            for c in range(1, m + 1):
                pw[i][c] = pw[i][c - 1] * nums[i] % MOD
        pc = [bin(x).count("1") for x in range(64)]
        dp = [[[0] * 32 for _ in range(m + 1)] for _ in range(m + 1)]
        dp[0][0][0] = 1
        for i in range(n):
            ndp = [[[0] * 32 for _ in range(m + 1)] for _ in range(m + 1)]
            pwi = pw[i]
            for j in range(m + 1):
                row = dp[j]
                cmj = comb[m - j]
                for b in range(m + 1):
                    for mask in range(32):
                        v = row[b][mask]
                        if v == 0:
                            continue
                        for c in range(m - j + 1):
                            t = mask + c
                            nb = b + (t & 1)
                            # Set bits of a sum of j+c powers never exceed
                            # j+c: prune lanes that can no longer reach k.
                            if nb + pc[t >> 1] > j + c:
                                continue
                            tgt = ndp[j + c][nb]
                            tgt[t >> 1] = (tgt[t >> 1] + v * cmj[c] % MOD * pwi[c]) % MOD
            dp = ndp
        # After the last index, mask holds every remaining high bit: the
        # total set-bit count of the sum is b + popcount(mask).
        ans = 0
        for b in range(m + 1):
            for mask in range(32):
                if b + pc[mask] == k:
                    ans = (ans + dp[m][b][mask]) % MOD
        return ans
