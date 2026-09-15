class Solution:
    def waysToDistribute(self, n: int, k: int) -> int:
        # dp[i][j] counts distributions of the first i candies into exactly
        # j nonempty bags: candy i either joins one of the j bags the first
        # i - 1 candies already fill (j choices) or opens the j-th bag
        # itself, so dp[i][j] = j * dp[i - 1][j] + dp[i - 1][j - 1] — the
        # Stirling-number recurrence. Bags are unordered, so "open a new
        # bag" has no identity to choose and every distribution is built
        # exactly once. Each row depends only on the row above, so two
        # rows of k + 1 residues carry the whole table. Residues stay
        # below 2^30 and j at or below 1000, so j * dp + dp stays below
        # 2^41 — trivial headroom for Python's integers, and the reason
        # the fixed-width solutions compute in 64-bit registers.
        MOD = 10**9 + 7
        prev = [0] * (k + 1)
        prev[0] = 1
        for i in range(1, n + 1):
            cur = [0] * (k + 1)
            top = min(i, k)
            for j in range(1, top + 1):
                cur[j] = (j * prev[j] + prev[j - 1]) % MOD
            prev = cur
        return prev[k]
