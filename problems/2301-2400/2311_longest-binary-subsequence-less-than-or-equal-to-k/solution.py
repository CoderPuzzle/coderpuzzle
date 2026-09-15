class Solution:
    def longestSubsequence(self, s: str, k: int) -> int:
        value = 0
        length = 0
        for ch in reversed(s):
            if ch == "0":
                length += 1
            elif value + (1 << length) <= k:
                value += 1 << length
                length += 1
        return length
