class Solution:
    def maxPower(self, s: str) -> int:
        best = 1
        current = 1
        for i in range(1, len(s)):
            if s[i] == s[i - 1]:
                current += 1
                if current > best:
                    best = current
            else:
                current = 1
        return best
