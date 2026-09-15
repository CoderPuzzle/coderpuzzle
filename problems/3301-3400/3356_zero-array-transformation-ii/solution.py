from typing import List


class Solution:
    def minZeroArray(self, nums: List[int], queries: List[List[int]]) -> int:
        # After the first k queries an index can reach zero exactly when the
        # total val of the queries covering it is at least nums[i] — each
        # index can spend every covering query's allowance independently,
        # and extra queries never hurt, so feasibility is monotone in k.
        # Binary search k; each probe folds the first k queries into a
        # difference array and checks one prefix sweep, O(n + q).
        n = len(nums)

        def feasible(k: int) -> bool:
            delta = [0] * (n + 1)
            for j in range(k):
                l, r, val = queries[j]
                delta[l] += val
                delta[r + 1] -= val
            cover = 0
            for i in range(n):
                cover += delta[i]
                if cover < nums[i]:
                    return False
            return True

        lo, hi = 0, len(queries)
        if not feasible(hi):
            return -1
        while lo < hi:
            mid = (lo + hi) // 2
            if feasible(mid):
                hi = mid
            else:
                lo = mid + 1
        return lo
