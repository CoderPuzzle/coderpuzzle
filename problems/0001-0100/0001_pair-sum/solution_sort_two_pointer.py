class Solution:
    def pairSum(self, nums: list[int], target: int) -> list[int]:
        # Order the positions by their values: the pair hunt can then run as
        # a converging scan, while each position rides along with its value.
        order = sorted(range(len(nums)), key=lambda position: nums[position])
        # Converging pointers over that order. A too-small total can only be
        # raised by advancing low; a too-large one only lowered by retreating
        # high -- each step retires one position as a possible member.
        low, high = 0, len(order) - 1
        while low < high:
            total = nums[order[low]] + nums[order[high]]
            if total == target:
                # The positions come out in value order; either ordering of
                # the two is accepted.
                return [order[low], order[high]]
            if total < target:
                low += 1
            else:
                high -= 1
        # Statement promises a solution exists; empty is just the fallback.
        return []
