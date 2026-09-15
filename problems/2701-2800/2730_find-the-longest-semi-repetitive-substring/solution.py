class Solution:
    def longestSemiRepetitiveSubstring(self, s: str) -> int:
        best = 0
        left = 0
        pairs = 0
        for right in range(len(s)):
            if right > 0 and s[right] == s[right - 1]:
                pairs += 1
            while pairs > 1:
                if s[left] == s[left + 1]:
                    pairs -= 1
                left += 1
            best = max(best, right - left + 1)
        return best
