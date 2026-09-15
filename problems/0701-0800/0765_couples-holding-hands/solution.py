from typing import List, Optional


class Solution:
    def minSwapsCouples(self, row: List[int]) -> int:
        row = list(row)
        n = len(row)
        pos = [0] * n
        for i, person in enumerate(row):
            pos[person] = i

        swaps = 0
        for i in range(0, n, 2):
            first = row[i]
            partner = first ^ 1  # couples are (0,1), (2,3), ...
            if row[i + 1] == partner:
                continue
            j = pos[partner]
            other = row[i + 1]
            # Swap the non-partner sitting next to `first` with `partner`.
            row[i + 1] = partner
            row[j] = other
            pos[partner] = i + 1
            pos[other] = j
            swaps += 1
        return swaps
