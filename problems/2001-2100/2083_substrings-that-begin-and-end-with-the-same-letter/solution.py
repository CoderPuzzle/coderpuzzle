class Solution:
    def numberOfSubstrings(self, s: str) -> int:
        counts = [0] * 26
        total = 0
        for character in s:
            index = ord(character) - ord("a")
            counts[index] += 1
            total += counts[index]
        return total
