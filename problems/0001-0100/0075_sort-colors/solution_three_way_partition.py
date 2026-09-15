class Solution:
    def sortColors(self, nums: list[int]) -> list[int]:
        # Three growing regions and an unexplored tail:
        #   [0, low)   settled 0s
        #   [low, mid) settled 1s
        #   [mid, high] unexamined
        #   (high, end) settled 2s
        # Each step examines nums[mid] and shrinks the unexamined band.
        low, mid, high = 0, 0, len(nums) - 1
        while mid <= high:
            value = nums[mid]
            if value == 0:
                # The element swapped in from `low` is a settled 1 (or mid
                # == low, swapping with itself), so mid may advance too.
                nums[low], nums[mid] = nums[mid], nums[low]
                low += 1
                mid += 1
            elif value == 1:
                # Already in its home region: the unexamined band alone
                # shrinks.
                mid += 1
            else:
                # The element swapped in from `high` is unexamined, so mid
                # stays put and re-reads it on the next pass.
                nums[mid], nums[high] = nums[high], nums[mid]
                high -= 1
        return nums
