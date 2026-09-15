class Solution:
    def countVowelSubstrings(self, word: str) -> int:
        bits = {"a": 1, "e": 2, "i": 4, "o": 8, "u": 16}
        total = 0
        for start in range(len(word)):
            mask = 0
            for end in range(start, len(word)):
                bit = bits.get(word[end], 0)
                if bit == 0:
                    break
                mask |= bit
                if mask == 31:
                    total += 1
        return total
