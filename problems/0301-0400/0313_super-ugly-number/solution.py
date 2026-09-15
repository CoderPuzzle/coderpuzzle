from typing import List


class Solution:
    def nthSuperUglyNumber(self, n: int, primes: List[int]) -> int:
        # Every super ugly number past 1 is a listed prime times a smaller
        # one, so build the sequence in order: one pointer per prime into
        # the built prefix, plus its cached candidate primes[p] * ugly[index[p]].
        # The next value is the smallest candidate; advancing EVERY pointer
        # whose candidate hit that minimum keeps duplicates (6 = 2 * 3 = 3 * 2,
        # one product reachable two ways) out of the sequence.
        ugly = [1] + [0] * (n - 1)
        index = [0] * len(primes)
        candidate = list(primes)
        for i in range(1, n):
            nxt = min(candidate)
            ugly[i] = nxt
            while nxt in candidate:
                p = candidate.index(nxt)
                index[p] += 1
                candidate[p] = primes[p] * ugly[index[p]]
        return ugly[n - 1]
