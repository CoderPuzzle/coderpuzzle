class Solution:
    def appendCharacters(self, s: str, t: str) -> int:
        # Match t from its start, scanning s once. Each time the current
        # characters agree, t advances; s advances on every step. The prefix
        # of t consumed this way is the longest one that is a subsequence of
        # s, so the unmatched tail of t is exactly what must be appended.
        i = 0
        j = 0
        n = len(s)
        m = len(t)
        while i < n and j < m:
            if s[i] == t[j]:
                j += 1
            i += 1
        return m - j
