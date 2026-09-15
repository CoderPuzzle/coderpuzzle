class Solution:
    def numMusicPlaylists(self, n: int, goal: int, k: int) -> int:
        # dp[i][j] counts playlists of length i that use exactly j distinct
        # songs. Play i introduces a new song — n - j + 1 choices left, so
        # dp[i-1][j-1] * (n - j + 1) — or repeats a used one: the last k
        # plays are pairwise distinct, because two occurrences of one song
        # closer than k would already violate the window, so exactly
        # min(k, j) used songs are blocked and max(0, j - k) remain,
        # giving dp[i-1][j] * (j - k). Row i reads only row i-1, so one
        # rolling row carries the table; the answer is dp[goal][n].
        MOD = 10**9 + 7
        prev = [0] * (n + 1)
        prev[0] = 1
        for i in range(1, goal + 1):
            cur = [0] * (n + 1)
            for j in range(1, min(i, n) + 1):
                total = prev[j - 1] * (n - j + 1)
                if j > k:
                    total += prev[j] * (j - k)
                cur[j] = total % MOD
            prev = cur
        return prev[n]
