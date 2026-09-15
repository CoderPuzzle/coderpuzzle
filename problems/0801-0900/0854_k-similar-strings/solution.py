from typing import List, Optional
from collections import deque


class Solution:
    def kSimilarity(self, s1: str, s2: str) -> int:
        # Each swap is a move between strings, so BFS from s1 yields
        # the minimum swap count.
        queue = deque([(s1, 0)])
        seen = {s1}
        while queue:
            s, steps = queue.popleft()
            if s == s2:
                return steps
            # Always fix the leftmost mismatch first: some optimal
            # solution does, and the rule prunes the branching.
            i = 0
            while s[i] == s2[i]:
                i += 1
            for j in range(i + 1, len(s)):
                # Install s2[i] at position i, and never break an
                # already-matching j — such a swap is never minimal.
                if s[j] == s2[i] and s[j] != s2[j]:
                    ns = s[:i] + s[j] + s[i + 1 : j] + s[i] + s[j + 1 :]
                    # Only novel strings join the queue; matched
                    # positions are never touched again.
                    if ns not in seen:
                        seen.add(ns)
                        queue.append((ns, steps + 1))
        # Unreachable: anagrams are always convertible.
        return -1
