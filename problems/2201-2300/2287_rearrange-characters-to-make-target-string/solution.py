from collections import Counter


class Solution:
    def rearrangeCharacters(self, s: str, target: str) -> int:
        # One copy consumes need[ch] of each letter ch, so s supplies
        # have[ch] // need[ch] copies' worth; the scarcest letter caps it.
        have, need = Counter(s), Counter(target)
        return min(have[ch] // need[ch] for ch in need)
