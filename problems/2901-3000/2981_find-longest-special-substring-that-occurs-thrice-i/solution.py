from typing import List, Optional


class Solution:
    def maximumLength(self, s: str) -> int:
        # The size bound invites brute force: tally every special
        # substring in a hash map, then keep the longest that reached
        # three occurrences.
        counts = {}
        n = len(s)
        for i in range(n):
            for j in range(i, n):
                if s[j] != s[i]:
                    break
                sub = s[i : j + 1]
                counts[sub] = counts.get(sub, 0) + 1
        best = -1
        for sub, c in counts.items():
            if c >= 3 and len(sub) > best:
                best = len(sub)
        return best
