from typing import List, Optional


class Solution:
    def countSubstrings(self, s: str) -> int:
        n = len(s)
        count = 0
        for center in range(n):
            # Each palindrome has one center: a character (odd) or a gap (even),
            # so trying both shapes discovers every occurrence exactly once.
            for left, right in ((center, center), (center, center + 1)):
                while left >= 0 and right < n and s[left] == s[right]:
                    # Every successful step is one more palindrome; stop at the
                    # first mismatch — wrapping can never restore symmetry.
                    count += 1
                    left -= 1
                    right += 1
        return count
