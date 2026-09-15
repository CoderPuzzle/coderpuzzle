from typing import List, Optional


class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        m, n = len(text1), len(text2)
        # dp row for the empty prefix of text1 (all zeros); each new row only
        # reads the row above, so two rows suffice
        prev = [0] * (n + 1)
        for i in range(1, m + 1):
            curr = [0] * (n + 1)
            c = text1[i - 1]
            for j in range(1, n + 1):
                if c == text2[j - 1]:
                    # aligning matching last chars is always safe: extend
                    # the LCS of both shorter prefixes
                    curr[j] = prev[j - 1] + 1
                else:
                    # an optimal LCS discards at least one of the two
                    # characters, so take the better of dropping either
                    curr[j] = max(prev[j], curr[j - 1])
            prev = curr
        return prev[n]
