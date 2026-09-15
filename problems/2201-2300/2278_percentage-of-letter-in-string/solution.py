class Solution:
    def percentageLetter(self, s: str, letter: str) -> int:
        # One pass counts the matches; multiplying before dividing keeps the
        # rounded-down percentage entirely in integer arithmetic.
        count = 0
        for character in s:
            if character == letter:
                count += 1
        return count * 100 // len(s)
