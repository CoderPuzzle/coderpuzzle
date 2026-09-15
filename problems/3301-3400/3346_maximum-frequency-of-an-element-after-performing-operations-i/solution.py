from collections import Counter
from typing import List


class Solution:
    def maxFrequency(self, nums: List[int], k: int, numOperations: int) -> int:
        # A target v collects every element in [v-k, v+k]: elements already
        # equal to v cost nothing, any other costs one operation, and the
        # surplus operations can always be spent as +0 elsewhere because
        # numOperations <= n. So the best frequency at v is
        # min(window(v), count(v) + numOperations). Elements are >= 1, so
        # targets below 1 never beat v = 1, and targets above max(nums)+k
        # see an empty window; a sliding window over every integer v in
        # [1, max(nums)+k] therefore evaluates all candidates.
        nums.sort()
        count = Counter(nums)
        best = 0
        lo = hi = 0
        n = len(nums)
        for v in range(1, nums[-1] + k + 1):
            while hi < n and nums[hi] <= v + k:
                hi += 1
            while lo < hi and nums[lo] < v - k:
                lo += 1
            best = max(best, min(hi - lo, count.get(v, 0) + numOperations))
        return best
