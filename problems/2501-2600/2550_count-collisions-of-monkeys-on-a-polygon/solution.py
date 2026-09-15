class Solution:
    def monkeyMove(self, n: int) -> int:
        # A collision-free movement must send every monkey the same way:
        # a clockwise mover followed by an anticlockwise one either meet
        # head-on on their shared edge or, propagated around the cycle,
        # force every neighbour to share the first direction. Only the
        # two all-clockwise and all-anticlockwise movements are safe, so
        # the answer is all 2^n movements minus those two, mod 10^9 + 7.
        MOD = 10**9 + 7
        return (pow(2, n, MOD) - 2) % MOD
