from typing import List, Optional


class Solution:
    # Largest rectangle under one row's histogram: monotonic stack of
    # column indices with strictly increasing heights.
    def largest_area(self, heights: List[int]) -> int:
        stack = []
        best = 0
        # The trailing 0 is a sentinel that flushes whatever remains on
        # the stack at the end of the row.
        for i, h in enumerate(heights + [0]):
            # A shorter bar has arrived: every stack bar taller than h just
            # found its right boundary, the current index i. Strict `>`
            # leaves equal heights on the stack, so the earlier of two
            # equal bars accounts for the full run when finally popped.
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                # Left boundary is the new top (nearest strictly shorter
                # bar), or -1 when the rectangle reaches the start.
                left = stack[-1] if stack else -1
                best = max(best, height * (i - left - 1))
            stack.append(i)
        return best

    def maximalRectangle(self, matrix: List[List[str]]) -> int:
        if not matrix or not matrix[0]:
            return 0
        rows, cols = len(matrix), len(matrix[0])
        # Every all-ones rectangle has a bottom row, and that row sees a
        # histogram of consecutive-1 column heights; solving largest
        # rectangle once per row and taking the max covers them all.
        heights = [0] * cols
        best = 0
        for r in range(rows):
            # Fold the row in: '1' extends the run, '0' resets to 0 since a
            # rectangle cannot span a zero.
            for c in range(cols):
                heights[c] = heights[c] + 1 if matrix[r][c] == "1" else 0
            best = max(best, self.largest_area(heights))
        return best
