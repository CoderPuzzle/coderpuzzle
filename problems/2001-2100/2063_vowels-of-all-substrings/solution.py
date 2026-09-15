class Solution:
    def countVowels(self, word: str) -> int:
        total = 0
        length = len(word)
        for index, character in enumerate(word):
            if character in "aeiou":
                total += (index + 1) * (length - index)
        return total
