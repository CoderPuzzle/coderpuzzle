from typing import List


class Solution:
    def findMatrix(self, nums: List[int]) -> List[List[int]]:
        # A value's k-th occurrence (counted from zero) always belongs to row
        # k: each row must hold distinct elements, so earlier copies can only
        # have occupied strictly earlier rows. Appending there therefore never
        # duplicates within a row, the rows stay minimal because one opens only
        # when a repeat forces a deeper level, and scanning in input order
        # keeps the construction fully deterministic.
        seen = {}
        rows: List[List[int]] = []
        for value in nums:
            rank = seen.get(value, 0)
            seen[value] = rank + 1
            if rank == len(rows):
                rows.append([])
            rows[rank].append(value)
        return rows
