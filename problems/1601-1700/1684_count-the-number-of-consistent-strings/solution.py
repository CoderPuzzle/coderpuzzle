from typing import List


class Solution:
    def countConsistentStrings(self, allowed: str, words: List[str]) -> int:
        # Consistency depends only on which letters a word uses, so fold
        # allowed into one 26-bit mask: bit i means 'a' + i may appear.
        allowed_mask = 0
        for ch in allowed:
            allowed_mask |= 1 << (ord(ch) - ord("a"))
        count = 0
        for word in words:
            mask = 0
            for ch in word:
                mask |= 1 << (ord(ch) - ord("a"))
            # the word is consistent exactly when its mask holds no bit
            # outside allowed_mask — one AND answers the subset question
            if mask & ~allowed_mask == 0:
                count += 1
        return count
