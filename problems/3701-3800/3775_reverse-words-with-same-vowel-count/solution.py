from typing import List, Optional


class Solution:
    def reverseWords(self, s: str) -> str:
        # The first word only fixes the target vowel count; each later
        # word matching it is reversed in place, everything else (word
        # order, separators) stays as-is.
        words = s.split(" ")

        def count_vowels(word: str) -> int:
            return sum(1 for c in word if c in "aeiou")

        target = count_vowels(words[0])
        for i in range(1, len(words)):
            if count_vowels(words[i]) == target:
                words[i] = words[i][::-1]
        return " ".join(words)
