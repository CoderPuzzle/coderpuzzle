from typing import List


class Solution:
    def canPartitionGrid(self, grid: List[List[int]]) -> bool:
        # A straight cut yields two rectangular slabs. Removing any single
        # cell from a slab spanning at least two rows and two columns keeps
        # it connected, so only slabs that are a single row or column
        # restrict the discount to their two end cells (a 1x1 slab would
        # empty out and can never match the other side's positive sum).
        # Sweep each axis twice with rolling prefix sums and a value set:
        # the forward pass tries discounting the leading slab, the backward
        # pass the trailing one. Sums reach 10^5 * 10^5 = 10^10, so they
        # are carried in 64-bit.
        m, n = len(grid), len(grid[0])
        total = sum(sum(row) for row in grid)

        def can_discount(d: int, a: int, b: int, vertical: bool, seen: set) -> bool:
            # Can discounting one cell of value d from the slab rows/cols
            # a..b equalize the two sides while keeping the slab connected?
            if vertical:
                if a == b:
                    return m > 1 and (grid[0][a] == d or grid[m - 1][a] == d)
                if m == 1:
                    return grid[0][a] == d or grid[0][b] == d
                return d in seen
            if a == b:
                return n > 1 and (grid[a][0] == d or grid[a][n - 1] == d)
            if n == 1:
                return grid[a][0] == d or grid[b][0] == d
            return d in seen

        seen = set()
        top = 0
        for i in range(m - 1):
            seen.update(grid[i])
            top += sum(grid[i])
            bottom = total - top
            if top == bottom or (top > bottom and can_discount(top - bottom, 0, i, False, seen)):
                return True
        seen = set()
        bottom = 0
        for i in range(m - 1, 0, -1):
            seen.update(grid[i])
            bottom += sum(grid[i])
            top = total - bottom
            if top == bottom or (bottom > top and can_discount(bottom - top, i, m - 1, False, seen)):
                return True
        seen = set()
        left = 0
        for j in range(n - 1):
            seen.update(grid[r][j] for r in range(m))
            left += sum(grid[r][j] for r in range(m))
            right = total - left
            if left == right or (left > right and can_discount(left - right, 0, j, True, seen)):
                return True
        seen = set()
        right = 0
        for j in range(n - 1, 0, -1):
            seen.update(grid[r][j] for r in range(m))
            right += sum(grid[r][j] for r in range(m))
            left = total - right
            if left == right or (right > left and can_discount(right - left, j, n - 1, True, seen)):
                return True
        return False
