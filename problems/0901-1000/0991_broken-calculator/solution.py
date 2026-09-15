from typing import List, Optional


class Solution:
    def brokenCalc(self, startValue: int, target: int) -> int:
        # Work backwards from target: reverse double is halve (only legal
        # on an even number) and reverse subtract-1 is add-1. While target
        # sits above startValue, an odd target must add 1 before it can
        # halve, and an even target halves at once — two adds pushed before
        # a halve equal one add after it, so deferring every add is optimal.
        # Below startValue only plain subtractions remain.
        ops = 0
        while target > startValue:
            if target % 2:
                target += 1
            else:
                target //= 2
            ops += 1
        return ops + startValue - target
