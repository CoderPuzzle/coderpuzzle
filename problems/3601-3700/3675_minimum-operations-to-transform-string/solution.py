class Solution:
    def minOperations(self, s: str) -> int:
        # Every occurrence of the chosen letter advances one step per
        # operation, so a letter whose zero-based alphabet index is i
        # needs (26 - i) % 26 operations of its own to reach 'a'.
        # Driving the letter with the largest remaining distance lets
        # slower letters catch up, merge, and ride along, so nothing
        # beyond that largest distance is ever paid.
        return max((26 - (ord(ch) - ord("a"))) % 26 for ch in s)
