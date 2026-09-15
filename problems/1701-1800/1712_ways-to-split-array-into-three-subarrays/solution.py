from typing import List, Optional
from bisect import bisect_left, bisect_right


class Solution:
    def waysToSplit(self, nums: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(nums)
        prefix = [0] * (n + 1)
        for i, value in enumerate(nums):
            prefix[i + 1] = prefix[i] + value
        total = prefix[n]
        answer = 0
        # prefix is non-decreasing, so for a fixed left cut the legal second
        # cuts form one contiguous range — delimit it with two searches.
        for i in range(1, n - 1):
            left = prefix[i]
            # left <= mid becomes prefix[j] >= 2 * left: first legal j.
            lo = bisect_left(prefix, 2 * left, i + 1, n)
            if lo >= n:
                continue
            # mid <= right becomes prefix[j] <= (total + left) // 2 — the
            # floor is exact because the bound is an integer inequality.
            hi = bisect_right(prefix, (total + left) // 2, lo, n)
            if hi > lo:
                answer = (answer + hi - lo) % MOD
        return answer
