from typing import List, Optional


class Solution:
    def sortVowels(self, s: str) -> str:
        # Consonants never move; only vowel values permute among the vowel
        # slots. Collect the vowels, sort them by ASCII (every uppercase
        # vowel sorts before every lowercase one, e.g. 'O' < 'e'), and pour
        # them back into the vowel slots left to right.
        vowels = sorted(c for c in s if c in "aeiouAEIOU")
        chars = []
        i = 0
        for c in s:
            if c in "aeiouAEIOU":
                chars.append(vowels[i])
                i += 1
            else:
                chars.append(c)
        return "".join(chars)
