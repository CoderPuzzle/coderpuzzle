from typing import List, Optional


class Solution:
    def longestPalindrome(self, s: str) -> str:
        # Walk outward from a center while the two boundary characters
        # match; each expansion step is a single comparison.
        def expand(left, right):
            while left >= 0 and right < len(s) and s[left] == s[right]:
                left -= 1
                right += 1
            # Overshot by one on each side: back up to the widest palindrome.
            return left + 1, right - 1

        # (0, 0) makes a single character the initial answer, so the
        # returned substring is never empty.
        best_start, best_end = 0, 0
        for i in range(len(s)):
            # Try both center kinds: (i, i) for odd lengths, (i, i + 1) for
            # even ones; at the last gap the even case fails immediately.
            for l, r in (expand(i, i), expand(i, i + 1)):
                # Strict > keeps an earlier palindrome on ties, so the
                # leftmost longest one wins ("babad" -> "bab", not "aba").
                if r - l > best_end - best_start:
                    best_start, best_end = l, r
        return s[best_start : best_end + 1]
