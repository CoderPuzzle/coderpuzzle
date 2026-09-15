from typing import List


class Solution:
    def maximizeSquareHoleArea(self, n: int, m: int, hBars: List[int], vBars: List[int]) -> int:
        # Removing a run of t consecutive bars merges t+1 lines of cells
        # into one span, so each axis contributes side = longest run + 1;
        # the square is limited by the smaller side. Only the bar lists
        # matter — n and m only bound where bars may sit.
        def longest_run(bars: List[int]) -> int:
            bars = sorted(bars)
            best = cur = 1
            for prev, now in zip(bars, bars[1:]):
                cur = cur + 1 if now == prev + 1 else 1
                best = max(best, cur)
            return best

        side = min(longest_run(hBars), longest_run(vBars)) + 1
        return side * side
