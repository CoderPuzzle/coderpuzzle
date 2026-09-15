from typing import List


class Solution:
    def amountPainted(self, paint: List[List[int]]) -> List[int]:
        # Canvas of "next possibly-unpainted cell" pointers: painting a cell
        # points it one past itself and find() compresses the skips, so every
        # unit of the painting is walked exactly once across all n days.
        limit = 50001
        nxt = list(range(limit + 1))

        def find(cell: int) -> int:
            root = cell
            while nxt[root] != root:
                root = nxt[root]
            while nxt[cell] != root:  # path compression
                nxt[cell], cell = root, nxt[cell]
            return root

        worklog = []
        for start, end in paint:
            area = 0
            cell = find(start)
            while cell < end:
                area += 1
                nxt[cell] = cell + 1
                cell = find(cell + 1)
            worklog.append(area)
        return worklog
