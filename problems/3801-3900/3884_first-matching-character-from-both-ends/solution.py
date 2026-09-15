class Solution:
    def firstMatchingIndex(self, s: str) -> int:
        # The smallest matching index can never sit past the middle: once i
        # exceeds n-1-i the pair is a repeat of one already tested. Scan the
        # outward-in pairs from index 0 and return the first equal one.
        n = len(s)
        for i in range((n + 1) // 2):
            if s[i] == s[n - 1 - i]:
                return i
        return -1
