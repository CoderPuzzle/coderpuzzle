from typing import List, Optional


class Solution:
    def numberOfSubarrays(self, nums: List[int]) -> int:
        n = len(nums)
        # leftGreater[i]: nearest index to the left with a strictly greater value
        leftGreater = [-1] * n
        stack = []
        for i, x in enumerate(nums):
            # values <= x can never be the nearest greater for a later element
            while stack and nums[stack[-1]] <= x:
                stack.pop()
            leftGreater[i] = stack[-1] if stack else -1
            stack.append(i)

        from bisect import bisect_right

        # earlier positions of each value, always appended in increasing order
        positions = {}
        ans = 0
        for i, x in enumerate(nums):
            lst = positions.setdefault(x, [])
            # equal-value starts beyond leftGreater[i], plus the singleton [i..i]
            count = 1 + len(lst) - bisect_right(lst, leftGreater[i])
            ans += count
            lst.append(i)
        return ans
