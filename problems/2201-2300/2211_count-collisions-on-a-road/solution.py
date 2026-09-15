from typing import List, Optional


class Solution:
    def countCollisions(self, directions: str) -> int:
        # The only cars that escape forever are the leading run of 'L's
        # (nothing ahead of them ever) and the trailing run of 'R's
        # (nothing behind them ever). Charge every collision to the moving
        # car that arrives at it: a head-on pair costs 2 and involves
        # exactly two movers, and a mover hitting a stationary car or a
        # stopped pile costs 1 and involves exactly one arriving mover —
        # its first collision. So each mover inside the trimmed span
        # contributes exactly 1 and stationary cars contribute nothing:
        # the answer is simply the count of non-'S' characters between the
        # two escape runs.
        n = len(directions)
        left = 0
        while left < n and directions[left] == "L":
            left += 1
        right = n - 1
        while right >= left and directions[right] == "R":
            right -= 1
        return sum(1 for ch in directions[left : right + 1] if ch != "S")
