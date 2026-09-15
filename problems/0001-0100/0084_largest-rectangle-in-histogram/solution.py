from typing import List, Optional


class Solution:
    def largestRectangleArea(self, heights: List[int]) -> int:
        # Stack of indices whose heights are strictly increasing. For any
        # bar, the widest full-height rectangle spans the nearest strictly
        # shorter bar on each side; the scan finds both boundaries
        # implicitly. Each index is pushed once and popped at most once,
        # so the nested while keeps the whole pass linear.
        stack = []
        best = 0
        # The trailing 0 is a sentinel: shorter than everything, it flushes
        # every remaining bar off the stack without adding area itself.
        for i, h in enumerate(heights + [0]):
            # A shorter bar has arrived: every stack bar taller than h just
            # found its right boundary, the current index i. Strict `>`
            # leaves equal heights on the stack, so an equal run still
            # computes its full width when finally flushed.
            while stack and heights[stack[-1]] > h:
                height = heights[stack.pop()]
                # Left boundary is the new top (nearest still strictly
                # shorter bar), or -1 when the rectangle reaches the start.
                left = stack[-1] if stack else -1
                best = max(best, height * (i - left - 1))
            stack.append(i)
        return best
