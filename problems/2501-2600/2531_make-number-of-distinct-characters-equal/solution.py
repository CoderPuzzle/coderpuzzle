from typing import List, Optional


class Solution:
    def isItPossible(self, word1: str, word2: str) -> bool:
        # One frequency array per word: any single move shifts exactly two
        # buckets, so its effect on the distinct counts is O(1) to evaluate.
        c1 = [0] * 26
        c2 = [0] * 26
        for ch in word1:
            c1[ord(ch) - ord("a")] += 1
        for ch in word2:
            c2[ord(ch) - ord("a")] += 1
        n1 = sum(v > 0 for v in c1)
        n2 = sum(v > 0 for v in c2)
        # Try every ordered pair (a, b): letter a leaves word1 and letter b
        # takes its place; equal letters mean the swap changes nothing.
        for a in range(26):
            if c1[a] == 0:
                continue
            for b in range(26):
                if c2[b] == 0:
                    continue
                if a == b:
                    # Swapping identical letters changes nothing, so this
                    # candidate succeeds exactly when the words already tie.
                    if n1 == n2:
                        return True
                    continue
                d1 = n1 - (c1[a] == 1) + (c1[b] == 0)
                d2 = n2 - (c2[b] == 1) + (c2[a] == 0)
                if d1 == d2:
                    return True
        return False
