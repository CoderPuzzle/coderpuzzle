from typing import List, Optional


class Solution:
    def wordCount(self, startWords: List[str], targetWords: List[str]) -> int:
        def mask(word):
            # No letter repeats, so a word is fully described by the 26-bit
            # mask of letters it contains.
            m = 0
            for c in word:
                m |= 1 << (ord(c) - 97)
            return m

        starts = {mask(w) for w in startWords}
        count = 0
        for t in targetWords:
            m = mask(t)
            # A target is obtainable iff its mask is a start mask plus one
            # extra bit; clearing each set bit tests exactly that inverse.
            # Same-mask words never count — exactly one letter is appended.
            for bit in range(26):
                if m & (1 << bit) and (m ^ (1 << bit)) in starts:
                    count += 1
                    break
        return count
