from typing import List, Optional


class Solution:
    def findKthNumber(self, m: int, n: int, k: int) -> int:
        # The table is too big to build; its values are orderly enough to count.
        # Row i holds multiples i, 2i, ..., ni — min(x // i, n) of them are <= x.
        def count_at_most(x):
            total = 0
            for i in range(1, m + 1):
                total += min(x // i, n)
                # Early exit once the count already reaches k.
                if total >= k:
                    return True
            return total >= k

        # Smallest x whose count reaches k; it must be an actual table entry,
        # otherwise x - 1 would satisfy the predicate too.
        lo, hi = 1, m * n
        while lo < hi:
            mid = (lo + hi) // 2
            if count_at_most(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
