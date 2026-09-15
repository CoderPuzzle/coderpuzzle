from typing import List


class Solution:
    def wiggleMaxLength(self, nums: List[int]) -> int:
        # An alternating subsequence is always in one of two states: its
        # last step rose, or its last step fell. Keep the best length
        # reached in each state; a rise extends the opposite state, a fall
        # extends the rising one, and equal neighbors extend nothing.
        n = len(nums)
        # up[i]: best within the first i + 1 elements ending on a rise;
        # down[i]: the symmetric best ending on a fall.
        up = [1] * n
        down = [1] * n
        for i in range(1, n):
            if nums[i] > nums[i - 1]:
                up[i] = down[i - 1] + 1
                down[i] = down[i - 1]
            elif nums[i] < nums[i - 1]:
                down[i] = up[i - 1] + 1
                up[i] = up[i - 1]
            else:
                up[i] = up[i - 1]
                down[i] = down[i - 1]
        return max(up[n - 1], down[n - 1])
