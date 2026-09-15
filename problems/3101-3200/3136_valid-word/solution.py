class Solution:
    def isValid(self, word: str) -> bool:
        # One scan: reject any character outside digits/letters while
        # tracking whether a vowel and a consonant were both seen.
        if len(word) < 3:
            return False
        has_vowel = has_consonant = False
        for ch in word:
            if "a" <= ch <= "z" or "A" <= ch <= "Z":
                if ch.lower() in "aeiou":
                    has_vowel = True
                else:
                    has_consonant = True
            elif "0" <= ch <= "9":
                continue
            else:
                return False
        return has_vowel and has_consonant
