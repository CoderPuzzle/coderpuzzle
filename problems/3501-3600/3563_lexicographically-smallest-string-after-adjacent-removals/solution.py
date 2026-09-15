from typing import List, Optional


class Solution:
    def lexicographicallySmallestString(self, s: str) -> str:
        n = len(s)
        if n <= 1:
            return s

        def consec(a, b):
            d = abs(ord(a) - ord(b))
            return d == 1 or d == 25  # 'a'-'z' are consecutive (circular)

        # rem[i][j] = can s[i..j] be removed entirely
        rem = [[False] * n for _ in range(n)]
        for length in range(2, n + 1):
            for i in range(n - length + 1):
                j = i + length - 1
                for k in range(i, j):
                    if rem[i][k] and rem[k + 1][j]:
                        rem[i][j] = True
                        break
                if not rem[i][j] and consec(s[i], s[j]):
                    if length == 2 or rem[i + 1][j - 1]:
                        rem[i][j] = True

        ans = [""] * (n + 1)
        ans[n] = ""
        for i in range(n - 1, -1, -1):
            best = None
            for j in range(i, n + 1):
                if j > i and not rem[i][j - 1]:
                    continue
                cand = s[j] + ans[j + 1] if j < n else ""
                if best is None or cand < best:
                    best = cand
            ans[i] = best
        return ans[0]
