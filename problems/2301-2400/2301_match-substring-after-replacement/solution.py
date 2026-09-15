from typing import List


class Solution:
    def matchReplacement(self, s: str, sub: str, mappings: List[List[str]]) -> bool:
        # base[t] marks every position of s holding character t; matched[old]
        # extends it with the positions each declared target covers, so bit p
        # of matched[old] is exactly matched(old, s[p]).
        base = [0] * 128
        for index, ch in enumerate(s):
            base[ord(ch)] |= 1 << index
        matched = base[:]
        for old, new in mappings:
            matched[ord(old)] |= base[ord(new)]
        # bit e of seen marks a window whose first j + 1 characters all match
        # and that ends at e. Seed with the first character's mask; every
        # later character grows the survivors one position deeper into s.
        seen = matched[ord(sub[0])]
        for j in range(1, len(sub)):
            seen = (seen << 1) & matched[ord(sub[j])]
        return seen != 0
