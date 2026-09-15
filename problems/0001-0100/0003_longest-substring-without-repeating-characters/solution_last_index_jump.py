from typing import List, Optional


class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        # last_seen maps each character to its most recent index; the window
        # s[start..i] is kept duplicate-free throughout the sweep.
        last_seen = {}
        start = 0
        best = 0
        for i, c in enumerate(s):
            # The >= start guard ignores occurrences that lie to the left of
            # the window; without it start could be dragged backwards.
            if c in last_seen and last_seen[c] >= start:
                # The window can no longer include that older occurrence, so
                # start leaps over the conflict instead of shrinking by one.
                start = last_seen[c] + 1
            last_seen[c] = i
            # Invariant restored: the window is duplicate-free again.
            best = max(best, i - start + 1)
        return best
