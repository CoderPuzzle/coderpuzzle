class Solution:
    def maxPalindromesAfterOperations(self, words: List[str]) -> int:
        count = [0] * 26
        for word in words:
            for char in word:
                count[ord(char) - ord("a")] += 1
        pairs = sum(c // 2 for c in count)
        made = 0
        for half in sorted(len(word) // 2 for word in words):
            if half > pairs:
                break
            pairs -= half
            made += 1
        return made
