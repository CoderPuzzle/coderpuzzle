from typing import List, Optional


class Solution:
    def numSplits(self, s: str) -> int:
        n = len(s)
        # prefix[i]: number of distinct letters in s[0..i]
        prefix = [0] * n
        seen = [False] * 26
        distinct = 0
        for i, c in enumerate(s):
            idx = ord(c) - ord("a")
            if not seen[idx]:
                seen[idx] = True
                distinct += 1
            prefix[i] = distinct

        # suffix[i]: number of distinct letters in s[i..n-1]
        suffix = [0] * n
        seen = [False] * 26
        distinct = 0
        for i in range(n - 1, -1, -1):
            idx = ord(s[i]) - ord("a")
            if not seen[idx]:
                seen[idx] = True
                distinct += 1
            suffix[i] = distinct

        return sum(1 for i in range(n - 1) if prefix[i] == suffix[i + 1])
