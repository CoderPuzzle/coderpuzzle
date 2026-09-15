from typing import List


class Solution:
    def makeEqual(self, words: List[str]) -> bool:
        # Pool all letters; n equal strings need each count % n == 0.
        n = len(words)
        counts = [0] * 26
        for w in words:
            for ch in w:
                counts[ord(ch) - ord("a")] += 1
        return all(c % n == 0 for c in counts)
