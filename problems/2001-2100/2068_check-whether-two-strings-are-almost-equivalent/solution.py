class Solution:
    def checkAlmostEquivalent(self, word1: str, word2: str) -> bool:
        differences = [0] * 26
        for first, second in zip(word1, word2):
            differences[ord(first) - ord("a")] += 1
            differences[ord(second) - ord("a")] -= 1
        return all(abs(difference) <= 3 for difference in differences)
