from typing import List, Optional


class Solution:
    def partition(self, s: str) -> List[List[str]]:
        n = len(s)
        # Table of palindrome verdicts for every interval s[i..j].
        is_pal = [[False] * n for _ in range(n)]
        # Reverse i ensures the inner interval is computed before any outer
        # interval that reads it.
        for i in range(n - 1, -1, -1):
            for j in range(i, n):
                # Palindrome iff ends match and the interior is empty or pal.
                if s[i] == s[j] and (j - i < 2 or is_pal[i + 1][j - 1]):
                    is_pal[i][j] = True

        result = []
        current = []

        def backtrack(start):
            # The pieces tile the whole string: snapshot the partition.
            if start == n:
                result.append(list(current))
                return
            # Increasing `end` yields shorter first pieces before longer ones,
            # producing the required output order.
            for end in range(start, n):
                if is_pal[start][end]:
                    current.append(s[start : end + 1])
                    backtrack(end + 1)
                    current.pop()

        backtrack(0)
        return result
