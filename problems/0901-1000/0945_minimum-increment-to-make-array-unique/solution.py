from typing import List


class Solution:
    def minIncrementForUnique(self, nums: List[int]) -> int:
        # Sorted, an element never regrets landing on the first free value
        # above its predecessor's final value — anything higher wastes moves.
        nums.sort()
        moves = 0
        prev = nums[0]
        for i in range(1, len(nums)):
            need = prev + 1 - nums[i]
            if need > 0:
                moves += need
                prev = nums[i] + need
            else:
                prev = nums[i]
        return moves
