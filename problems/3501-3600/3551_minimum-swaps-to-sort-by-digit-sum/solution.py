from typing import List


class Solution:
    def minSwaps(self, nums: List[int]) -> int:
        # Sorting by (digit sum, value) fixes the target order; mapping
        # every element to its target position turns the rearrangement
        # into a permutation, and the minimum number of swaps is
        # n - (number of cycles): each cycle of length L costs L - 1.
        # The cycle walk is iterative -- n reaches 10^5, past any safe
        # recursion depth.
        def digit_sum(v: int) -> int:
            s = 0
            while v > 0:
                s += v % 10
                v //= 10
            return s

        order = sorted(range(len(nums)), key=lambda i: (digit_sum(nums[i]), nums[i]))
        pos = [0] * len(nums)
        for target, i in enumerate(order):
            pos[i] = target
        swaps = 0
        visited = [False] * len(nums)
        for i in range(len(nums)):
            if visited[i]:
                continue
            length = 0
            j = i
            while not visited[j]:
                visited[j] = True
                j = pos[j]
                length += 1
            swaps += length - 1
        return swaps
