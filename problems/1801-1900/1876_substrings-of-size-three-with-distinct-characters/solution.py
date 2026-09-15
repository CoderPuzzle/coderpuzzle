class Solution:
    def countGoodSubstrings(self, s: str) -> int:
        # A length-3 window is good iff its three characters are pairwise
        # distinct; slide the center and count.
        return sum(1 for i in range(1, len(s) - 1) if s[i - 1] != s[i] and s[i] != s[i + 1] and s[i - 1] != s[i + 1])
