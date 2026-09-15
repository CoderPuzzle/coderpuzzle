from typing import List


class Solution:
    def mapWordWeights(self, words: List[str], weights: List[int]) -> str:
        # Each word's weight is the sum of its characters' entries in
        # weights — at most 10 chars * 100 = 1000, comfortably inside a
        # machine int. Reflecting that total's residue mod 26 down from
        # 'z' gives one letter per word (0 -> 'z', 1 -> 'y', ..., 25 -> 'a').
        letters = []
        for word in words:
            total = 0
            for c in word:
                total += weights[ord(c) - ord("a")]
            letters.append(chr(ord("z") - total % 26))
        return "".join(letters)
