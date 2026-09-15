from collections import deque
from typing import List, Optional


class Solution:
    def countSubarrays(self, nums: List[int], k: int) -> int:
        # Bounds: n <= 10^5 and nums[i] <= 10^9, so a window cost (max-min)
        # * length is at most (10^9-1)*10^5 < 10^14, and the answer reaches
        # n(n+1)/2 ~ 5*10^9. Python ints are exact throughout.
        n = len(nums)
        max_q = deque()  # indices of max candidates, values decreasing
        min_q = deque()  # indices of min candidates, values increasing
        ans = 0
        left = 0
        for right, x in enumerate(nums):
            while max_q and nums[max_q[-1]] <= x:
                max_q.pop()
            max_q.append(right)
            while min_q and nums[min_q[-1]] >= x:
                min_q.pop()
            min_q.append(right)
            # Growing the window only raises max, lowers min and lengthens
            # the window, so cost is non-decreasing in window size: shrink
            # from the left while invalid, then every subarray ending at
            # right with left endpoint >= left is valid — right-left+1 of
            # them. A single element costs 0 <= k, so the loop stops.
            while (nums[max_q[0]] - nums[min_q[0]]) * (right - left + 1) > k:
                if max_q[0] == left:
                    max_q.popleft()
                if min_q[0] == left:
                    min_q.popleft()
                left += 1
            ans += right - left + 1
        return ans
