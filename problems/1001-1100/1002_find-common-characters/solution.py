from typing import List


class Solution:
    def commonChars(self, words: List[str]) -> List[str]:
        # Fold every word's 26-length letter-count array into a running
        # element-wise minimum; a letter absent from any single word is
        # pinned to zero from that point on.
        common = [0] * 26
        for i, word in enumerate(words):
            counts = [0] * 26
            for c in word:
                counts[ord(c) - ord("a")] += 1
            if i == 0:
                common = counts
            else:
                common = [min(a, b) for a, b in zip(common, counts)]
        # Reading the surviving counts off from 'a' to 'z' builds the
        # answer directly in ascending alphabetical order.
        result = []
        for i in range(26):
            result.extend([chr(ord("a") + i)] * common[i])
        return result
