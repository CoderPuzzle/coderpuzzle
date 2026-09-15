from collections import Counter
from typing import List


class Solution:
    def oddString(self, words: List[str]) -> str:
        # Encode each word as its difference signature (the n-1 consecutive
        # letter differences); the odd word is the one whose signature
        # appears exactly once.
        sigs = [tuple(ord(w[i + 1]) - ord(w[i]) for i in range(len(w) - 1)) for w in words]
        counts = Counter(sigs)
        for w, s in zip(words, sigs):
            if counts[s] == 1:
                return w
        return ""
