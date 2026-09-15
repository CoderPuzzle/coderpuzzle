class Solution:
    def minMovesToCaptureTheQueen(self, a: int, b: int, c: int, d: int, e: int, f: int) -> int:
        # The answer is 1 or 2. It is 1 exactly when a white piece already
        # attacks the queen through an unobstructed line; the other white
        # piece is the only thing that can stand between.
        if a == e and not (c == a and ((b < d < f) or (f < d < b))):
            return 1  # rook shares the queen's rank, bishop not between
        if b == f and not (d == b and ((a < c < e) or (e < c < a))):
            return 1  # rook shares the queen's file, bishop not between
        if c - e == d - f or c - e == f - d:
            on_diag = a - c == b - d or a - c == d - b
            in_span = a - e == b - f or a - e == f - b
            between = (c < a < e) or (e < a < c)
            if not (on_diag and in_span and between):
                return 1  # bishop's diagonal is clear down to the queen
        return 2  # no immediate attack; a staging move always exists
