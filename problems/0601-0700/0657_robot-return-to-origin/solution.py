class Solution:
    def judgeCircle(self, moves: str) -> bool:
        # Vertical and horizontal movement never interact, so the plane
        # splits into two independent lines: the U/D balance and the L/R
        # balance. One sweep with two counters captures all there is to
        # check.
        vertical = 0
        horizontal = 0
        for ch in moves:
            if ch == "U":
                vertical += 1
            elif ch == "D":
                vertical -= 1
            elif ch == "L":
                horizontal -= 1
            else:
                horizontal += 1
        # The robot is home exactly when both counters cancel to zero; a
        # leftover on either axis leaves it displaced no matter how the
        # moves were ordered.
        return vertical == 0 and horizontal == 0
