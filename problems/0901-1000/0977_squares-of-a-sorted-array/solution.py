from typing import List


class Solution:
    def sortedSquares(self, nums: List[int]) -> List[int]:
        # The input is sorted, so the largest remaining square always sits at
        # one of the two ends of the unprocessed window. Compare the squares
        # of the two ends, write the larger into the back of the answer, and
        # move that end inward — one pass, no sort. Ties take the left end;
        # both squares are written, one now and one in a later step.
        squares = [0] * len(nums)
        left, right = 0, len(nums) - 1
        for position in range(len(nums) - 1, -1, -1):
            left_square = nums[left] * nums[left]
            right_square = nums[right] * nums[right]
            if left_square >= right_square:
                squares[position] = left_square
                left += 1
            else:
                squares[position] = right_square
                right -= 1
        return squares
