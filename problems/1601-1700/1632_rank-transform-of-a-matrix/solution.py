from typing import List, Optional


class Solution:
    def matrixRankTransform(self, matrix: List[List[int]]) -> List[List[int]]:
        m = len(matrix)
        n = len(matrix[0])
        # Process in increasing value order: strictly smaller values are
        # already assigned, so only ties need coordination.
        cells = sorted((matrix[r][c], r, c) for r in range(m) for c in range(n))

        # Largest rank used so far in each row/column, from smaller values.
        row_max = [0] * m
        col_max = [0] * n
        ans = [[0] * n for _ in range(m)]

        parent = {}

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a, b):
            ra, rb = find(a), find(b)
            if ra != rb:
                parent[rb] = ra

        i = 0
        while i < len(cells):
            value = cells[i][0]
            j = i
            group = []
            while j < len(cells) and cells[j][0] == value:
                group.append((cells[j][1], cells[j][2]))
                j += 1

            # Fresh union-find per group, so components never leak across
            # different values.
            for r, c in group:
                parent[(r, c)] = (r, c)
            # Equal values sharing a row or column are forced to the same
            # rank; unions chain through shared rows/columns.
            by_row = {}
            for r, c in group:
                if r in by_row:
                    union((r, c), by_row[r])
                else:
                    by_row[r] = (r, c)
            by_col = {}
            for r, c in group:
                if c in by_col:
                    union((r, c), by_col[c])
                else:
                    by_col[c] = (r, c)

            # Component rank = 1 + the strictest requirement over its cells;
            # that is simultaneously the smallest legal rank for all of them.
            comp_rank = {}
            for r, c in group:
                root = find((r, c))
                candidate = max(row_max[r], col_max[c]) + 1
                if candidate > comp_rank.get(root, 0):
                    comp_rank[root] = candidate

            # Assign the shared rank and refresh the row/column maxima so
            # later, larger values see it.
            for r, c in group:
                rank = comp_rank[find((r, c))]
                ans[r][c] = rank
                if rank > row_max[r]:
                    row_max[r] = rank
                if rank > col_max[c]:
                    col_max[c] = rank

            i = j

        return ans
