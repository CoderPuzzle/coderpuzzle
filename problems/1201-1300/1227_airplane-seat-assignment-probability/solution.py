class Solution:
    def nthPersonGetsNthSeat(self, n: int) -> float:
        # The floating claim ends by taking seat 1 or seat n, each equally
        # likely; the last passenger wins exactly when seat 1 goes first.
        return 1.0 if n == 1 else 0.5
