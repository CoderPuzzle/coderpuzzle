from typing import List, Optional


class Solution:
    def longestPalindrome(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        # palS[i][j] (palT[i][j]) records whether s[i..j] (t[i..j]) is a
        # palindrome; the tables also give single-string answers, because
        # either substring may be empty. Padding rows keep below[j-1] in
        # bounds on the last row.
        palS = [[False] * (n + 1) for _ in range(n + 1)]
        best = 0
        for i in range(n - 1, -1, -1):
            palS[i][i] = True
            si = s[i]
            below = palS[i + 1]
            row = palS[i]
            for j in range(i + 1, n):
                row[j] = (si == s[j]) and (j == i + 1 or below[j - 1])
            for j in range(n - 1, i - 1, -1):
                if row[j]:
                    length = j - i + 1
                    if length > best:
                        best = length
                    break
        palT = [[False] * (m + 1) for _ in range(m + 1)]
        for i in range(m - 1, -1, -1):
            palT[i][i] = True
            ti = t[i]
            below = palT[i + 1]
            row = palT[i]
            for j in range(i + 1, m):
                row[j] = (ti == t[j]) and (j == i + 1 or below[j - 1])
            for j in range(m - 1, i - 1, -1):
                if row[j]:
                    length = j - i + 1
                    if length > best:
                        best = length
                    break
        # Enumerate every pair of non-empty substrings. The concatenation
        # s[i..i2] + t[j..j2] is a palindrome iff the shorter side mirrors
        # the longer one and the leftover piece is itself a palindrome.
        for i in range(n):
            for i2 in range(i, n):
                la = i2 - i + 1
                for j in range(m):
                    for j2 in range(j, m):
                        lb = j2 - j + 1
                        if la + lb <= best:
                            continue
                        limit = la if la < lb else lb
                        ok = True
                        for k in range(limit):
                            if s[i + k] != t[j2 - k]:
                                ok = False
                                break
                        if not ok:
                            continue
                        if la == lb:
                            best = la + lb
                        elif la > lb and palS[i + lb][i2]:
                            best = la + lb
                        elif la < lb and palT[j][j2 - la]:
                            best = la + lb
        return best
