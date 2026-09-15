from math import gcd


class Solution:
    def minimizeSet(self, divisor1: int, divisor2: int, uniqueCnt1: int, uniqueCnt2: int) -> int:
        # Binary search the smallest feasible maximum m. For a candidate m:
        #   m - m//d1  numbers arr1 can take (not divisible by divisor1),
        #   m - m//d2  numbers arr2 can take (not divisible by divisor2),
        #   m - m//lcm numbers blocked by neither array's constraint.
        # Feasible iff each pool covers its count and the shared pool covers
        # both counts combined.
        def feasible(m: int) -> bool:
            shared = divisor1 // gcd(divisor1, divisor2) * divisor2
            free = m - m // shared
            return (
                m - m // divisor1 >= uniqueCnt1 and m - m // divisor2 >= uniqueCnt2 and free >= uniqueCnt1 + uniqueCnt2
            )

        lo, hi = 1, 2 * (uniqueCnt1 + uniqueCnt2)
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
