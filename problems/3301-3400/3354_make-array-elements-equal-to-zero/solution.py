from typing import List


class Solution:
    def countValidSelections(self, nums: List[int]) -> int:
        # The constraints are tiny, so replay the process literally: for
        # every zero cell walk both directions on a scratch copy. A zero
        # cell advances curr; a positive cell is decremented and flips the
        # direction before the step. A selection counts when the walk leaves
        # the array with every value at zero.
        def finishes(start: int, step: int) -> bool:
            cells = nums[:]
            curr = start
            while 0 <= curr < len(cells):
                if cells[curr] == 0:
                    curr += step
                else:
                    cells[curr] -= 1
                    step = -step
                    curr += step
            return all(cell == 0 for cell in cells)

        total = 0
        for i, value in enumerate(nums):
            if value == 0:
                if finishes(i, 1):
                    total += 1
                if finishes(i, -1):
                    total += 1
        return total
