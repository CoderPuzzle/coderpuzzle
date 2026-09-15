from typing import List


class Solution:
    def selfDividingNumbers(self, left: int, right: int) -> List[int]:
        # Each candidate is judged on a copy: peeling digits off the tail
        # with %10 and //10 walks the decimal writing from last digit to
        # first while n itself stays intact for the divisibility test. A
        # digit of 0 rejects on sight — it divides nothing, and the
        # statement bars it anyway — and any digit leaving a remainder in
        # n % d rejects too; survivors append in scan order, which is
        # already ascending.
        answer = []
        for n in range(left, right + 1):
            m, ok = n, True
            while m > 0:
                d = m % 10
                if d == 0 or n % d != 0:
                    ok = False
                    break
                m //= 10
            if ok:
                answer.append(n)
        return answer
