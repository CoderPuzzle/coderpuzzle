class Solution:
    def leastOpsExpressTarget(self, x: int, target: int) -> int:
        # Between the additions and subtractions, every maximal run of
        # multiplications and divisions collapses to one power of x, so the
        # expression is a signed sum of powers. A copy of x^i (i >= 1) costs
        # i - 1 operators to build plus one to attach, and a copy of 1 = x/x
        # costs the division plus the attach — so a copy is charged 2
        # operators at the units place and i operators at the i-th place.
        # Reading target in base x, each digit d is paid either d copies at
        # its own place or x - d copies subtracted with one unit carried into
        # the next place up. Sweeping digits from the least significant end
        # with the two carry states 0/1, and charging one top unit for a
        # carry that survives past the top digit, minimizes the operator
        # total; the very first copy needs no attaching operator, so one is
        # deducted at the end.
        cost0, cost1 = 0, 1 << 60
        i = 0
        t = target
        while t:
            p = 2 if i == 0 else i
            r = t % x
            t //= x
            cost0, cost1 = (
                min(cost0 + r * p, cost1 + (r + 1) * p),
                min(cost0 + (x - r) * p, cost1 + (x - r - 1) * p),
            )
            i += 1
        return min(cost0, cost1 + i) - 1
