from typing import List


class Solution:
    def countGoodSubarrays(self, nums: List[int]) -> int:
        # A subarray is good iff its bitwise OR equals its maximum element,
        # i.e. every element's bits are contained in the max's bits. Count
        # each subarray at its rightmost maximum: index i owns subarrays
        # inside (left[i], right[i]) from two monotonic stacks, and the bit
        # condition shrinks that window to the nearest element on each side
        # carrying a bit absent from nums[i]. At n = 10^5 the answer reaches
        # n(n+1)/2 ~ 5*10^9, so the accumulator is 64-bit (Python ints are
        # exact regardless).
        n = len(nums)
        left = [-1] * n
        stack = []
        for i in range(n):
            while stack and nums[stack[-1]] <= nums[i]:
                stack.pop()
            left[i] = stack[-1] if stack else -1
            stack.append(i)
        right = [n] * n
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and nums[stack[-1]] < nums[i]:
                stack.pop()
            right[i] = stack[-1] if stack else n
            stack.append(i)
        bits = 31  # nums[i] < 2^30; bit 30 stays unused
        last = [-1] * bits
        max_left = [-1] * n
        for i, x in enumerate(nums):
            m = -1
            for b in range(bits):
                if ((x >> b) & 1) == 0 and last[b] > m:
                    m = last[b]
            max_left[i] = m
            y = x
            while y:
                low = y & -y
                last[low.bit_length() - 1] = i
                y ^= low
        nxt = [n] * bits
        min_right = [n] * n
        for i in range(n - 1, -1, -1):
            x = nums[i]
            m = n
            for b in range(bits):
                if ((x >> b) & 1) == 0 and nxt[b] < m:
                    m = nxt[b]
            min_right[i] = m
            y = x
            while y:
                low = y & -y
                nxt[low.bit_length() - 1] = i
                y ^= low
        ans = 0
        for i in range(n):
            lo = left[i] if left[i] > max_left[i] else max_left[i]
            hi = right[i] if right[i] < min_right[i] else min_right[i]
            ans += (i - lo) * (hi - i)
        return ans
