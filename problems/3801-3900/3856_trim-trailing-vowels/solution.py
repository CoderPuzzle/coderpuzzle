class Solution:
    def trimTrailingVowels(self, s: str) -> str:
        end = len(s)
        while end > 0 and s[end - 1] in "aeiou":
            end -= 1
        return s[:end]
