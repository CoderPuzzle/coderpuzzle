from typing import List, Optional


class Solution:
    def minDeletionSize(self, strs: List[str]) -> int:
        deletions = 0
        rows, cols = len(strs), len(strs[0])
        # cut[i]: rows i and i + 1 are already strictly ordered on the kept
        # prefix, so later columns no longer constrain that pair.
        cut = [False] * (rows - 1)
        for j in range(cols):
            bad = False
            for i in range(rows - 1):
                if not cut[i] and strs[i][j] > strs[i + 1][j]:
                    # A still-undecided pair drops here: the column must go.
                    bad = True
                    break
            if bad:
                deletions += 1
                continue
            for i in range(rows - 1):
                if not cut[i] and strs[i][j] < strs[i + 1][j]:
                    # A strict rise settles the pair for every later column.
                    cut[i] = True
        return deletions
