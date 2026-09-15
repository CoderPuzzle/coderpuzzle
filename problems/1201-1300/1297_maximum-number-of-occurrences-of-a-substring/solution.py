from collections import defaultdict
from typing import List


class Solution:
    def maxFreq(self, s: str, maxLetters: int, minSize: int, maxSize: int) -> int:
        # A length-L qualifying substring (L > minSize) has a minSize prefix
        # occurring at least as often, so only exact-minSize windows count.
        counts = defaultdict(int)
        for start in range(len(s) - minSize + 1):
            window = s[start : start + minSize]
            if len(set(window)) <= maxLetters:
                counts[window] += 1
        return max(counts.values()) if counts else 0
