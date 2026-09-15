from typing import List, Optional


class Solution:
    def maxProduct(self, words: List[str]) -> int:
        # Only the set of distinct letters matters: compress each word into
        # a 26-bit mask (bit set per letter present) plus its length.
        masks = []
        for word in words:
            mask = 0
            for ch in word:
                mask |= 1 << (ord(ch) - ord("a"))
            masks.append((mask, len(word)))
        best = 0
        n = len(masks)
        for i in range(n):
            mi, li = masks[i]
            for j in range(i + 1, n):
                mj, lj = masks[j]
                # Masks AND to zero exactly when the words share no letter.
                if mi & mj == 0 and li * lj > best:
                    best = li * lj
        return best
