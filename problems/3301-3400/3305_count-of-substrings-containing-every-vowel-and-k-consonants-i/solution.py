class Solution:
    def countOfSubstrings(self, word: str, k: int) -> int:
        # For each start, grow the window rightward maintaining a 5-bit
        # vowel mask and a running consonant total; count every end where
        # all five vowels are present and exactly k consonants are inside.
        n = len(word)
        total = 0
        for start in range(n):
            seen = 0
            consonants = 0
            for end in range(start, n):
                ch = word[end]
                if ch == "a":
                    seen |= 1 << 0
                elif ch == "e":
                    seen |= 1 << 1
                elif ch == "i":
                    seen |= 1 << 2
                elif ch == "o":
                    seen |= 1 << 3
                elif ch == "u":
                    seen |= 1 << 4
                else:
                    consonants += 1
                if seen == 31 and consonants == k:
                    total += 1
        return total
