class Solution:
    def countPalindromicSubsequences(self, s: str) -> int:
        # dp[x][i][j] counts the distinct palindromic subsequences of
        # s[i..j] that begin and end with chr(97 + x). An end that does
        # not match x shrinks off: dp[x][i+1][j] when s[i] != x, else
        # dp[x][i][j-1]. When both ends are x, gluing x onto both sides
        # of every palindromic interior gives 2 + sum_y dp[y][i+1][j-1]
        # — the +2 is "x" and "xx" — while adjacent ends carry only
        # those two. Every read stays in rows i and i+1, so two rolling
        # rows carry the table; the answer is sum_x dp[x][0][n-1].
        MOD = 10**9 + 7
        n = len(s)
        code = [ord(ch) - 97 for ch in s]
        prev = [[0] * 4 for _ in range(n)]
        cur = [[0] * 4 for _ in range(n)]
        for i in range(n - 1, -1, -1):
            c = code[i]
            cur[i] = [1 if x == c else 0 for x in range(4)]
            for j in range(i + 1, n):
                row = list(prev[j])
                if code[j] == c:
                    if j == i + 1:
                        row[c] = 2
                    else:
                        inner = prev[j - 1]
                        row[c] = (2 + inner[0] + inner[1] + inner[2] + inner[3]) % MOD
                else:
                    row[c] = cur[j - 1][c]
                cur[j] = row
            prev, cur = cur, prev
        top = prev[n - 1]
        return (top[0] + top[1] + top[2] + top[3]) % MOD
