from typing import List, Optional


class Solution:
    def maxBalancedSubsequenceSum(self, nums: List[int]) -> int:
        n = len(nums)
        # Balance rearranges to nums[j] - j >= nums[i] - i, so a subsequence
        # is balanced precisely when b[i] = nums[i] - i is non-decreasing
        # along it. Compress b into ranks to key the Fenwick tree.
        vals = [nums[i] - i for i in range(n)]
        comp = sorted(set(vals))
        m = len(comp)
        idx_of = {v: i + 1 for i, v in enumerate(comp)}

        # Max-flavored Fenwick tree: update propagates dp values upward,
        # query returns the best dp among ranks <= i.
        bit = [0] * (m + 1)

        def update(i, value):
            while i <= m:
                if value > bit[i]:
                    bit[i] = value
                i += i & -i

        def query(i):
            best = 0
            while i > 0:
                if bit[i] > best:
                    best = bit[i]
                i -= i & -i
            return best

        ans = None
        for i in range(n):
            j = idx_of[vals[i]]
            # dp[i] = nums[i] + best predecessor dp with rank <= j; starting
            # at 0 (never negative) implements "a single element is always
            # balanced". Ties are fine since equal b values satisfy the
            # rearranged inequality, so the query includes i's own rank.
            best = query(j)
            dp = nums[i] if best <= 0 else nums[i] + best
            if ans is None or dp > ans:
                ans = dp
            update(j, dp)
        return ans
