from typing import List, Optional


class Solution:
    def beautySum(self, s: str) -> int:
        # For each start, grow the substring one character at a time and
        # read every prefix's beauty straight off a running count array:
        # max frequency minus min nonzero frequency.
        total = 0
        n = len(s)
        for i in range(n):
            counts = [0] * 26
            for j in range(i, n):
                counts[ord(s[j]) - ord("a")] += 1
                total += max(counts) - min(c for c in counts if c)
        return total
