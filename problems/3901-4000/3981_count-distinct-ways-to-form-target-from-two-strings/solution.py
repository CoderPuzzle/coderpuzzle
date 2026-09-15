class Solution:
    def interleaveCharacters(self, a: str, b: str, t: str) -> int:
        M = 1_000_000_007
        n = len(a)
        m = len(b)
        dp = [[0] * (m + 1) for _ in range(n + 1)]
        dp[0][0] = 1
        for ch in t:
            nd = [[0] * (m + 1) for _ in range(n + 1)]
            for j in range(m + 1):
                run = 0
                for i in range(n + 1):
                    run = (run + dp[i][j]) % M
                    if i < n and a[i] == ch:
                        nd[i + 1][j] = (nd[i + 1][j] + run) % M
            for i in range(n + 1):
                run = 0
                for j in range(m + 1):
                    run = (run + dp[i][j]) % M
                    if j < m and b[j] == ch:
                        nd[i][j + 1] = (nd[i][j + 1] + run) % M
            dp = nd
        total = sum(map(sum, dp)) % M

        def sub(w):
            d = [1] + [0] * len(t)
            for x in w:
                for j in range(len(t) - 1, -1, -1):
                    if t[j] == x:
                        d[j + 1] = (d[j + 1] + d[j]) % M
            return d[-1]

        return (total - sub(a) - sub(b)) % M
