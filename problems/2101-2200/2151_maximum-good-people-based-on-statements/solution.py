from typing import List, Optional


class Solution:
    def maximumGood(self, statements: List[List[int]]) -> int:
        n = len(statements)
        best = 0
        # Enumerate every assignment: bit i set means person i is good.
        # The constraint is one-sided — good people must tell the truth,
        # bad people may say anything.
        for mask in range(1 << n):
            good = [i for i in range(n) if mask & (1 << i)]
            valid = True
            for i in good:
                for j in range(n):
                    # 2 = no statement; a "j is good" claim requires bit j
                    # set and a "j is bad" claim requires it clear.
                    if statements[i][j] == 2:
                        continue
                    is_good = bool(mask & (1 << j))
                    if is_good != (statements[i][j] == 1):
                        valid = False
                        break
                if not valid:
                    break
            if valid:
                best = max(best, len(good))
        return best
