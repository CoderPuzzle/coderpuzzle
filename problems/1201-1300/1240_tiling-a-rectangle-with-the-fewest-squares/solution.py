class Solution:
    def tilingRectangle(self, n: int, m: int) -> int:
        # Height of each column: the first column whose top is lowest names
        # the next uncovered cell, so the board state is just n heights.
        heights = [0] * m
        best = n * m  # the all-1x1 tiling is always available

        def find_hole() -> int:
            target = min(heights)
            return heights.index(target)

        def can_place(column: int, side: int) -> bool:
            return column + side <= m and all(h == heights[column] for h in heights[column : column + side])

        def backtrack(count: int) -> None:
            nonlocal best
            if count >= best:
                return
            column = find_hole()
            if heights[column] == n:
                best = count  # every column full
                return
            # Largest side first: finds a strong incumbent early.
            for side in range(min(n - heights[column], m - column), 0, -1):
                if not can_place(column, side):
                    continue
                for c in range(column, column + side):
                    heights[c] += side
                backtrack(count + 1)
                for c in range(column, column + side):
                    heights[c] -= side

        backtrack(0)
        return best
