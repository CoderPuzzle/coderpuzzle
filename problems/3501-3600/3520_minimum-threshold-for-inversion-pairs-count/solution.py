from bisect import bisect_right
from typing import List


class Solution:
    def minThreshold(self, nums: List[int], k: int) -> int:
        # count(x) = #{(i, j) : i < j, nums[i] > nums[j], nums[i] - nums[j]
        # <= x} is non-decreasing in x, so binary search the smallest x with
        # count(x) >= k. Each count sweeps left to right with a Fenwick tree
        # over the compressed values, adding for every j the number of
        # earlier elements whose value falls in the window (nums[j],
        # nums[j] + x]. n <= 1e4 bounds the pair count by n*(n-1)/2 < 5e7,
        # so 32-bit totals are safe.
        vals = sorted(set(nums))
        m = len(vals)
        rank = {v: i + 1 for i, v in enumerate(vals)}
        ranks = [rank[v] for v in nums]
        max_diff = vals[-1] - vals[0]

        def count(x: int) -> int:
            tree = [0] * (m + 1)
            total = 0
            for c in ranks:
                hi = bisect_right(vals, vals[c - 1] + x)
                lo = c
                while hi > 0:
                    total += tree[hi]
                    hi -= hi & -hi
                while lo > 0:
                    total -= tree[lo]
                    lo -= lo & -lo
                i = c
                while i <= m:
                    tree[i] += 1
                    i += i & -i
            return total

        if max_diff == 0 or count(max_diff) < k:
            return -1
        lo, hi = 1, max_diff
        while lo < hi:
            mid = (lo + hi) // 2
            if count(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
