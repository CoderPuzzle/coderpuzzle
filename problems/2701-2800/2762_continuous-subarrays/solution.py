from typing import List, Optional
from collections import deque


class Solution:
    def continuousSubarrays(self, nums: List[int]) -> int:
        min_dq = deque()  # indices, values increasing (front = min)
        max_dq = deque()  # indices, values decreasing (front = max)
        left = 0
        count = 0
        for right, value in enumerate(nums):
            while min_dq and nums[min_dq[-1]] >= value:
                min_dq.pop()
            min_dq.append(right)
            while max_dq and nums[max_dq[-1]] <= value:
                max_dq.pop()
            max_dq.append(right)
            # equality is allowed, so only a spread above 2 forces the shrink
            while nums[max_dq[0]] - nums[min_dq[0]] > 2:
                if max_dq[0] == left:
                    max_dq.popleft()
                if min_dq[0] == left:
                    min_dq.popleft()
                left += 1
            # every start in [left, right] keeps the spread within the band
            count += right - left + 1
        return count
