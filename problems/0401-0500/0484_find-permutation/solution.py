from typing import List


class Solution:
    def findPermutation(self, s: str) -> List[int]:
        # Ascending 1..n+1 is the lexicographically smallest arrangement of
        # the values, and it already satisfies every 'I' — so disturb it only
        # where a maximal run of 'D's demands a descent, by reversing exactly
        # the block that run covers.
        n = len(s)
        perm = list(range(1, n + 2))
        i = 0
        while i < n:
            if s[i] == "D":
                start = i
                while i < n and s[i] == "D":
                    i += 1
                perm[start : i + 1] = reversed(perm[start : i + 1])
            else:
                i += 1
        return perm
