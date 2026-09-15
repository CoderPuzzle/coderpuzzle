from typing import List, Optional


class Solution:
    def canBeTypedWords(self, text: str, brokenLetters: str) -> int:
        # Broken keys form a set; a word is typable only when none of its
        # letters are in that set.
        broken = set(brokenLetters)
        count = 0
        for word in text.split(" "):
            if not any(letter in broken for letter in word):
                count += 1
        return count
