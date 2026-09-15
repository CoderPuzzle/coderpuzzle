from typing import List


class Solution:
    def distinctNames(self, ideas: List[str]) -> int:
        # Suffixes (name minus first letter) grouped by first letter; within
        # a group every suffix is unique because all names are unique.
        suffixes = [set() for _ in range(26)]
        for idea in ideas:
            suffixes[ord(idea[0]) - ord("a")].add(idea[1:])
        # A swap between letters a and b survives exactly when neither suffix
        # already exists in the other letter's group; inclusion-exclusion
        # turns that count into sizes minus the shared overlap. The answer
        # can reach ~n^2 > 10^9, but Python ints do not overflow.
        total = 0
        for a in range(26):
            for b in range(a + 1, 26):
                shared = len(suffixes[a] & suffixes[b])
                total += 2 * (len(suffixes[a]) - shared) * (len(suffixes[b]) - shared)
        return total
