from typing import List, Optional


class Solution:
    def findProductsOfElements(self, queries: List[List[int]]) -> List[int]:
        def _count_bit(M, b):
            # count of integers in [1, M] with bit b set
            if M <= 0:
                return 0
            cycle = 1 << (b + 1)
            half = 1 << b
            full = (M + 1) // cycle
            rem = (M + 1) % cycle
            return full * half + max(0, rem - half)

        def _popcount_prefix(M):
            total = 0
            b = 0
            while (1 << b) <= M:
                total += _count_bit(M, b)
                b += 1
            return total

        def _bitsum_prefix(M):
            total = 0
            b = 0
            while (1 << b) <= M:
                total += b * _count_bit(M, b)
                b += 1
            return total

        def _exponent_sum(n):
            # sum of exponents of the first n elements of big_nums (n >= 0)
            if n <= 0:
                return 0
            lo, hi = 0, n
            while lo < hi:
                mid = (lo + hi + 1) // 2
                if _popcount_prefix(mid) <= n:
                    lo = mid
                else:
                    hi = mid - 1
            M = lo
            total = _bitsum_prefix(M)
            rem = n - _popcount_prefix(M)
            if rem > 0:
                x = M + 1
                b = 0
                while rem > 0:
                    if (x >> b) & 1:
                        total += b
                        rem -= 1
                    b += 1
            return total

        result = []
        for frm, to, mod in queries:
            exp = _exponent_sum(to + 1) - _exponent_sum(frm)
            result.append(pow(2, exp, mod))
        return result
