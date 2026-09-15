from typing import List


class Solution:
    def maximumProcessableQueries(self, nums: List[int], queries: List[int]) -> int:
        n, m = len(nums), len(queries)
        # dp[l][r]: most queries processable while nums[l:r] all survive. The
        # window starts as the whole array and shrinks one index per step;
        # a leaving end either serves the next query in order or was dropped
        # silently by the once-only subsequence op.
        dp = [[0] * (n + 1) for _ in range(n + 1)]
        best = 0
        for span in range(n - 1, -1, -1):
            for l in range(n - span + 1):
                r = l + span
                t = 0
                if l > 0:
                    p = dp[l - 1][r]
                    if p > t:
                        t = p
                    if p < m and nums[l - 1] >= queries[p] and p + 1 > t:
                        t = p + 1
                if r < n:
                    p = dp[l][r + 1]
                    if p > t:
                        t = p
                    if p < m and nums[r] >= queries[p] and p + 1 > t:
                        t = p + 1
                dp[l][r] = t
                # Every survivor block can be op-deleted too, so empty
                # windows carry the answer.
                if span == 0 and t > best:
                    best = t
        return best
