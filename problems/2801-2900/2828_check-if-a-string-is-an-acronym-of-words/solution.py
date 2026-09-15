from typing import List


class Solution:
    def isAcronym(self, words: List[str], s: str) -> bool:
        # Collect the first character of every word, join them in order, and
        # compare the joined acronym with s. Ordinary string equality covers
        # every failure mode: unequal lengths and any mismatched position.
        return "".join(word[0] for word in words) == s
