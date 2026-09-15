from typing import List, Optional


class Solution:
    def numberOfSpecialSubstrings(self, s: str) -> int:
        # last[c] is the most recent index of c; left is the smallest
        # window start keeping s[left..i] free of repeating characters.
        last = [-1] * 26
        left = 0
        ans = 0
        for i, ch in enumerate(s):
            c = ord(ch) - ord("a")
            # An occurrence left of the window yields last[c] + 1 <= left,
            # so stale entries leave the window untouched.
            left = max(left, last[c] + 1)
            # Every start in [left..i] ends a special substring at i.
            ans += i - left + 1
            last[c] = i
        return ans
