class Solution:
    def reverseDegree(self, s: str) -> int:
        # Each character contributes its reversed-alphabet value (26 - letter
        # rank) times its 1-indexed string position; sum over the whole string.
        total = 0
        for index, char in enumerate(s):
            total += (26 - (ord(char) - ord("a"))) * (index + 1)
        return total
