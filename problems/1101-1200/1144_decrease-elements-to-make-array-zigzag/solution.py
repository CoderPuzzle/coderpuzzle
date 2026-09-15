from typing import List


class Solution:
    def movesToMakeZigzag(self, nums: List[int]) -> int:
        def cost(valley_parity: int) -> int:
            moves = 0
            for i in range(valley_parity, len(nums), 2):
                # Valley must drop below both neighbors; the neighbors are
                # peaks of the other parity and never get decreased.
                left = nums[i - 1] if i > 0 else float("inf")
                right = nums[i + 1] if i + 1 < len(nums) else float("inf")
                bound = min(left, right)
                if nums[i] >= bound:
                    moves += nums[i] - bound + 1
            return moves

        return min(cost(0), cost(1))
