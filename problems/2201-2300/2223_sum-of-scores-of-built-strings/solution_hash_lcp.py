class Solution:
    def sumScores(self, s: str) -> int:
        n = len(s)
        if n == 0:
            return 0
        a = [ord(c) - 97 for c in s]
        MOD1 = 10**9 + 7
        MOD2 = 10**9 + 9
        BASE = 26

        # Prefix hashes under two independent moduli plus base powers, so any
        # question "does the suffix at i agree with the prefix for L chars?" is
        # answered from three table reads.
        pow1 = [1] * (n + 1)
        pow2 = [1] * (n + 1)
        pre1 = [0] * (n + 1)
        pre2 = [0] * (n + 1)
        for i in range(n):
            pow1[i + 1] = pow1[i] * BASE % MOD1
            pow2[i + 1] = pow2[i] * BASE % MOD2
            pre1[i + 1] = (pre1[i] * BASE + a[i]) % MOD1
            pre2[i + 1] = (pre2[i] * BASE + a[i]) % MOD2

        # Agreement for L characters implies agreement at every shorter length,
        # so the predicate is prefix-monotone: binary-search each suffix's
        # longest common prefix with s. s itself scores n.
        total = n
        for i in range(1, n):
            lo, hi = 0, n - i
            pi1 = pre1[i]
            pi2 = pre2[i]
            while lo < hi:
                mid = (lo + hi + 1) // 2
                h1 = (pre1[i + mid] - pi1 * pow1[mid]) % MOD1
                h2 = (pre2[i + mid] - pi2 * pow2[mid]) % MOD2
                if h1 == pre1[mid] and h2 == pre2[mid]:
                    lo = mid
                else:
                    hi = mid - 1
            total += lo
        return total
