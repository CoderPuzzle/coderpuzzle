class Solution:
    def makePalindrome(self, s: str) -> bool:
        mismatches = 0
        left, right = 0, len(s) - 1
        while left < right:
            if s[left] != s[right]:
                mismatches += 1
            left += 1
            right -= 1
        return mismatches <= 2
