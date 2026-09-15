from typing import List, Optional


class Solution:
    def isThree(self, n: int) -> bool:
        # Positive divisors pair off (d, n/d), so exactly three divisors
        # forces n = x*x and a divisor list of just 1, x, x^2 -- which holds
        # precisely when x is prime (a composite root x = a*b would add a*b
        # as a fourth divisor). Since n <= 10^4, the root x <= 100 and trial
        # division up to sqrt(x) costs at most a dozen checks.
        x = 1
        while x * x < n:
            x += 1
        if x * x != n:
            return False
        for d in range(2, x):
            if x % d == 0:
                return False
        return x > 1
