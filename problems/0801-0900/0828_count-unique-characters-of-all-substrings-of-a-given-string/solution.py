from typing import List, Optional


class Solution:
    def uniqueLetterString(self, s: str) -> int:
        # Reorganize the sum per occurrence: a letter adds 1 exactly
        # for substrings in which it appears precisely once. Bucket
        # the indices of each letter.
        positions = [[] for _ in range(26)]
        for i, c in enumerate(s):
            positions[ord(c) - ord("A")].append(i)
        n = len(s)
        total = 0
        for pos in positions:
            if not pos:
                continue
            # Sentinels -1 and n give the first and last occurrences
            # the same window arithmetic.
            pos = [-1] + pos + [n]
            for k in range(1, len(pos) - 1):
                # i-p left endpoints after the previous equal letter,
                # q-i right endpoints before the next: each
                # (substring, unique char) pair counted exactly once.
                total += (pos[k] - pos[k - 1]) * (pos[k + 1] - pos[k])
        return total
