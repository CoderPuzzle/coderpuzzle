from typing import List, Optional

from bisect import bisect_left


class Solution:
    def minSubArrayLen(self, target: int, nums: List[int]) -> int:
        n = len(nums)
        # prefix[i] = sum of the first i elements. Positivity makes it
        # strictly increasing, which is what licenses the binary search.
        prefix = [0] * (n + 1)
        for i, x in enumerate(nums):
            prefix[i + 1] = prefix[i] + x
        # Sentinel: an impossible length that survives when target is never met.
        best = n + 1
        for i in range(n):
            # The sum of nums[i..j) is prefix[j] - prefix[i], so the
            # shortest run starting at i reaching the target ends at the
            # first prefix >= prefix[i] + target.
            j = bisect_left(prefix, prefix[i] + target, i + 1, n + 1)
            if j <= n:
                best = min(best, j - i)
        return 0 if best == n + 1 else best
