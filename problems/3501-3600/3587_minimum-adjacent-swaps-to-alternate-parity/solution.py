from typing import List


class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        # Only parity matters. In any target alternating pattern the
        # k-th even (in current order) must land on the k-th even slot —
        # crossings among equal-parity elements never pay — and each
        # adjacent swap moves exactly one even by one position, so a
        # pattern's cost is the sum |even index - even slot| (the odds
        # mirror the evens). Try both patterns; a pattern is feasible
        # only when its even-slot count equals the even count, which
        # also encodes the |evenCnt - oddCnt| > 1 impossibility.
        evens = [i for i, v in enumerate(nums) if v % 2 == 0]
        k = len(evens)
        n = len(nums)
        best = -1
        for start in (0, 1):
            if (n - start + 1) // 2 != k:
                continue
            cost = sum(abs(evens[j] - (start + 2 * j)) for j in range(k))
            if best < 0 or cost < best:
                best = cost
        return best
