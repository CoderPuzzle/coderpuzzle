from typing import List


class Solution:
    def maximizeExpressionOfThree(self, nums: List[int]) -> int:
        # The best assignment inside any picked triple puts its two largest
        # values in the a and b slots and its smallest in the c slot, so the
        # optimum is the array's two largest values minus its smallest.
        top, runner_up = max(nums[0], nums[1]), min(nums[0], nums[1])
        low = runner_up
        # Fold in every later element (n >= 3): below the minimum replaces
        # it, above the top pushes the old top down to runner-up, anything
        # else that beats the runner-up takes its seat.
        for i in range(2, len(nums)):
            num = nums[i]
            if num < low:
                low = num
            if num > top:
                runner_up = top
                top = num
            elif num > runner_up:
                runner_up = num
        return top + runner_up - low
