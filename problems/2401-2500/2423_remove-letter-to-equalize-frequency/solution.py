from typing import List


class Solution:
    def equalFrequency(self, word: str) -> bool:
        # Count all 26 letters, then try removing one occurrence of each
        # present letter and test whether the surviving frequencies
        # collapse to a single value. 26 candidates x O(26) check.
        freq = [0] * 26
        for ch in word:
            freq[ord(ch) - ord("a")] += 1
        for c in range(26):
            if freq[c] == 0:
                continue
            freq[c] -= 1
            remaining = [f for f in freq if f > 0]
            if len(set(remaining)) <= 1:
                return True
            freq[c] += 1
        return False
