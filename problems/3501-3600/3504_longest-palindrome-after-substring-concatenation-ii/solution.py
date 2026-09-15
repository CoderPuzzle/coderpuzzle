from typing import List, Optional


class Solution:
    def longestPalindrome(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        # p[i] = longest palindrome starting at s[i] (a palindromic prefix of
        # s[i:]). A rolling interval table fills every row bottom-up, so the
        # whole pass is O(n^2) time and O(n) space.
        p = [1] * n
        below = [False] * (n + 1)
        for i in range(n - 1, -1, -1):
            row = [False] * (n + 1)
            row[i] = True
            si = s[i]
            best = 1
            for j in range(i + 1, n):
                row[j] = (si == s[j]) and (j == i + 1 or below[j - 1])
                if row[j]:
                    best = j - i + 1
            p[i] = best
            below = row
        # q[j] = longest palindrome ending at t[j] (a palindromic suffix of
        # t[:j+1]); the same fill records the longest length per right end.
        q = [1] * m
        below = [False] * (m + 1)
        for i in range(m - 1, -1, -1):
            row = [False] * (m + 1)
            row[i] = True
            ti = t[i]
            for j in range(i + 1, m):
                row[j] = (ti == t[j]) and (j == i + 1 or below[j - 1])
                if row[j]:
                    q[j] = j - i + 1
            below = row
        best = max(max(p), max(q))
        # dp[i][j] = longest palindrome starting with s[i] and ending with
        # t[j]. Each cell needs only dp[i+1][j-1], its neighbour on the same
        # diagonal i + j, so one scalar walks each diagonal from the far end
        # inward. dp[i][j] is max(p[i], q[j]), plus 2 + dp[i+1][j-1] when
        # s[i] == t[j] lets the two sides interlock; at the table edge the
        # missing neighbour becomes p[i+1] (no t-part left) or q[j-1] (no
        # s-part left).
        for d in range(n + m - 1):
            i_hi = d if d < n else n - 1
            i_lo = d - m + 1
            if i_lo < 0:
                i_lo = 0
            j_hi = d - i_hi
            nxt = 0
            if i_hi < n - 1:
                nxt = p[i_hi + 1]
            elif j_hi > 0:
                nxt = q[j_hi - 1]
            for i in range(i_hi, i_lo - 1, -1):
                j = d - i
                cur = p[i] if p[i] > q[j] else q[j]
                if s[i] == t[j]:
                    add = nxt + 2
                    if add > cur:
                        cur = add
                if cur > best:
                    best = cur
                nxt = cur
        return best
