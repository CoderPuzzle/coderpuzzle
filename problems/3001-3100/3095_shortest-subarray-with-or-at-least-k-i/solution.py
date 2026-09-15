from typing import List, Optional


class Solution:
    def minimumSubarrayLength(self, nums: List[int], k: int) -> int:
        # n <= 50 and every value fits in six bits, so a right-to-left scan
        # over subarrays is plenty: fix the right endpoint, extend the left
        # edge one element at a time keeping a running OR of nums[l..r],
        # and the first l that reaches k gives the shortest special
        # subarray ending at r. No subarray OR exceeds 63 here, so nothing
        # grows past 32 bits.
        best = -1
        for r in range(len(nums)):
            current = 0
            for l in range(r, -1, -1):
                current |= nums[l]
                if current >= k:
                    length = r - l + 1
                    if best == -1 or length < best:
                        best = length
                    break
        return best
