from collections import Counter
from typing import List


class Solution:
    def visibleMountains(self, peaks: List[List[int]]) -> int:
        # Mountain (x, y) contains peak (a, b) exactly when |a - x| <= y - b:
        # the peak sits inside or on the slopes. Sorting by x ascending (ties
        # by y descending) guarantees every potential coverer sorts no later,
        # so one monotonic-stack pass suffices — but an invisible mountain can
        # still hide others, so duplicates are only marked at the end, never
        # skipped mid-pass.
        counts = Counter(map(tuple, peaks))
        stack: list[tuple[int, int, bool]] = []  # (x, y, counted)
        for x, y in sorted(counts):
            # The new mountain hides everything on the stack whose peak falls
            # inside it; popping order is safe because slopes only narrow as
            # x advances.
            while stack and abs(stack[-1][0] - x) <= y - stack[-1][1]:
                stack.pop()
            covered = bool(stack) and abs(x - stack[-1][0]) <= stack[-1][1] - y
            if not covered:
                stack.append((x, y, counts[(x, y)] == 1))
        return sum(1 for _, _, counted in stack if counted)
