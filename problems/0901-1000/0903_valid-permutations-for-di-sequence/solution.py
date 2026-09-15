class Solution:
    def numPermsDISequence(self, s: str) -> int:
        # dp[i][j] counts ways to fill the first i+1 positions, valid so
        # far, with position i holding the j-th smallest value placed.
        # Appending a value of new rank j shifts older ranks >= j up one,
        # so an 'I' step admits exactly the old ranks below j and a 'D'
        # step the old ranks j and above — both are prefix sums of the
        # previous row: P[j] for 'I', P[m] - P[j] for 'D'. One rolling
        # row carries the table; the answer is sum dp[n][*].
        MOD = 10**9 + 7
        dp = [1]
        for ch in s:
            m = len(dp)
            prefix = [0] * (m + 1)
            for j in range(m):
                prefix[j + 1] = (prefix[j] + dp[j]) % MOD
            if ch == "I":
                dp = prefix
            else:
                dp = [(prefix[m] - prefix[j] + MOD) % MOD for j in range(m + 1)]
        return sum(dp) % MOD
