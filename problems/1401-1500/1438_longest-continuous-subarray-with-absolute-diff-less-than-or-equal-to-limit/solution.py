from collections import deque
from typing import List, Optional


class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        maxq = deque()  # indices, values decreasing
        minq = deque()  # indices, values increasing
        left = 0
        best = 0
        for right, x in enumerate(nums):
            while maxq and nums[maxq[-1]] <= x:
                maxq.pop()
            maxq.append(right)
            while minq and nums[minq[-1]] >= x:
                minq.pop()
            minq.append(right)
            while nums[maxq[0]] - nums[minq[0]] > limit:
                if maxq[0] == left:
                    maxq.popleft()
                if minq[0] == left:
                    minq.popleft()
                left += 1
            if right - left + 1 > best:
                best = right - left + 1
        return best
