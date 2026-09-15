class Solution:
    def longestPalindrome(self, words: List[str]) -> int:
        waiting = [[0] * 26 for _ in range(26)]
        length = 0
        for word in words:
            first = ord(word[0]) - ord("a")
            second = ord(word[1]) - ord("a")
            if waiting[second][first] > 0:
                waiting[second][first] -= 1
                length += 4
            else:
                waiting[first][second] += 1
        if any(waiting[letter][letter] for letter in range(26)):
            length += 2
        return length
