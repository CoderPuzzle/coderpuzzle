from bisect import bisect_left, bisect_right
from typing import List


class Solution:
    def maxFrequency(self, nums: List[int], k: int, numOperations: int) -> int:
        # A target v collects every element in [v-k, v+k]: elements already
        # equal to v cost nothing, any other costs one operation, and the
        # surplus operations can always be spent as +0 elsewhere because
        # numOperations <= n. So the best frequency at v is
        # min(window(v), count(v) + numOperations). Values reach 1e9, far
        # too wide to sweep every integer, so only breakpoints are tried:
        # if the optimum falls off an element, its window's smallest element
        # x can slide the target to x + k without losing anyone, so
        # v = nums[i] and v = nums[i] + k always contain an optimum;
        # nums[i] - k is kept as the symmetric guard. Every candidate is
        # scored exactly by two binary searches, and window bounds reach
        # 3e9, past 32 bits — no product is ever formed, so 64-bit lanes
        # hold everything (and JS Numbers stay far below 2^53).
        nums.sort()
        best = 0
        for x in nums:
            for v in (x - k, x, x + k):
                window = bisect_right(nums, v + k) - bisect_left(nums, v - k)
                exact = bisect_right(nums, v) - bisect_left(nums, v)
                best = max(best, min(window, exact + numOperations))
        return best
