from math import gcd
from typing import List


class Solution:
    def numberOfSubsequences(self, nums: List[int]) -> int:
        # nums[p] * nums[r] == nums[q] * nums[s] rearranges to
        # nums[p] / nums[q] == nums[s] / nums[r]: a leading pair (p, q) and a
        # trailing pair (r, s) sharing one reduced fraction. Sweep r left to
        # right; when r clears q + 2 the pair (p, q) joins the counter, and
        # every (r, s) with s >= r + 2 looks its fraction up.
        counts = {}
        total = 0
        for r in range(len(nums)):
            if r >= 2:
                q = r - 2
                for p in range(q - 1):
                    divisor = gcd(nums[p], nums[q])
                    ratio = (nums[p] // divisor, nums[q] // divisor)
                    counts[ratio] = counts.get(ratio, 0) + 1
            for s in range(r + 2, len(nums)):
                divisor = gcd(nums[s], nums[r])
                ratio = (nums[s] // divisor, nums[r] // divisor)
                total += counts.get(ratio, 0)
        return total
