class Solution:
    def lengthOfLastWord(self, s: str) -> int:
        # Walk in from the right: trailing spaces belong to no word, so skip
        # them, then count letters until a space or the start of the string.
        i = len(s) - 1
        while i >= 0 and s[i] == " ":
            i -= 1
        end = i
        while i >= 0 and s[i] != " ":
            i -= 1
        return end - i
