class Solution:
    def construct(self, grid):
        def uniform(r0, c0, size, first):
            for r in range(r0, r0 + size):
                row = grid[r]
                for c in range(c0, c0 + size):
                    if row[c] != first:
                        return False
            return True

        def build(r0, c0, size):
            first = grid[r0][c0]
            if uniform(r0, c0, size, first):
                return QuadNode(bool(first), True)
            half = size // 2
            return QuadNode(
                False,
                False,
                build(r0, c0, half),
                build(r0, c0 + half, half),
                build(r0 + half, c0, half),
                build(r0 + half, c0 + half, half),
            )

        return build(0, 0, len(grid))
