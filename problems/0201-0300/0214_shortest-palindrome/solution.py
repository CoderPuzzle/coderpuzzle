from typing import List, Optional


class Solution:
    def shortestPalindrome(self, s: str) -> str:
        rev = s[::-1]
        # A prefix of s is a palindrome exactly when it equals a suffix of
        # rev, so the KMP prefix function over s + "#" + rev finds it. The
        # separator character (absent from s) keeps the border from
        # stretching across the join and exceeding len(s).
        combined = s + "#" + rev
        n = len(combined)
        lps = [0] * n
        for i in range(1, n):
            # j is the border length of the previous position: shrink through
            # lps[j-1] on mismatch, extend by one on match — linear overall.
            j = lps[i - 1]
            while j > 0 and combined[i] != combined[j]:
                j = lps[j - 1]
            if combined[i] == combined[j]:
                j += 1
            lps[i] = j
        # The last entry is the longest proper border: the palindromic
        # prefix length.
        pal_len = lps[-1] if n else 0
        # Mirror only the non-palindromic tail onto the front.
        return rev[: len(s) - pal_len] + s
