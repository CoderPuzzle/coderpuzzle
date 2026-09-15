class Solution:
    def isSumEqual(self, firstWord: str, secondWord: str, targetWord: str) -> bool:
        # Letter values are single decimal digits, so a positional fold
        # (v = v*10 + d) reproduces the concatenated-digit integer.
        def val(word: str) -> int:
            v = 0
            for ch in word:
                v = v * 10 + (ord(ch) - 97)
            return v

        return val(firstWord) + val(secondWord) == val(targetWord)
