class Solution:
    def longestCommonPrefix(self, s: str, t: str) -> int:
        n, m = len(s), len(t)
        # Walk to the first mismatch (or whichever string ends first).
        i = 0
        while i < n and i < m and s[i] == t[i]:
            i += 1
        # Removing s[i] is the only deletion worth trying: an earlier one
        # shifts the alignment for no gain, a later one cannot repair the
        # mismatch at i. Either string ending here also degenerates cleanly.
        j, k = i + 1, i
        while j < n and k < m and s[j] == t[k]:
            j += 1
            k += 1
        return k
