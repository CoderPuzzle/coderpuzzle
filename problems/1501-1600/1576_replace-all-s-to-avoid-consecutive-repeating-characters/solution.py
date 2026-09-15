from typing import List, Optional


class Solution:
    def modifyString(self, s: str) -> str:
        # Only 3 candidate letters and at most 2 neighbors to avoid, so one
        # of 'a', 'b', 'c' (tried in that fixed order) always works.
        chars = list(s)
        n = len(chars)
        for i in range(n):
            if chars[i] != "?":
                continue
            for candidate in "abc":
                left_ok = i == 0 or chars[i - 1] != candidate
                right_ok = i == n - 1 or chars[i + 1] != candidate
                if left_ok and right_ok:
                    chars[i] = candidate
                    break
        return "".join(chars)
