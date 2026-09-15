from typing import List


class Solution:
    def vowelStrings(self, words: List[str], left: int, right: int) -> int:
        # A word counts exactly when both endpoints are vowels; a frozenset
        # keeps each endpoint check constant time.
        vowels = frozenset("aeiou")
        count = 0
        for i in range(left, right + 1):
            word = words[i]
            if word[0] in vowels and word[-1] in vowels:
                count += 1
        return count
