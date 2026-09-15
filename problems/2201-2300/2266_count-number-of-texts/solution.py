class Solution:
    def countTexts(self, pressedKeys: str) -> int:
        MOD = 10**9 + 7
        n = len(pressedKeys)
        dp = [0] * (n + 1)
        dp[0] = 1
        i = 0
        while i < n:
            ch = pressedKeys[i]
            max_press = 4 if ch in "79" else 3
            j = i
            while j < n and pressedKeys[j] == ch:
                j += 1
            # dp[p+1] = sum of dp[q] for the last max_press positions of the run
            for p in range(i, j):
                total = 0
                q = p
                while q >= i and p - q < max_press:
                    total = (total + dp[q]) % MOD
                    q -= 1
                dp[p + 1] = total
            i = j
        return dp[n]
