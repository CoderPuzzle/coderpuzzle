from typing import List


class Solution:
    def jump(self, nums: List[int]) -> int:
        # Implicit BFS over jump levels: the indices reachable in `jumps`
        # steps form the window (current_end, next_end], so one left-to-right
        # walk with two window edges replaces an explicit queue.
        jumps = 0
        current_end = 0
        next_end = 0
        for index in range(len(nums) - 1):
            next_end = max(next_end, index + nums[index])
            if index == current_end:
                # The level is exhausted; the next jump starts the level
                # that reaches as far as anything scanned so far.
                jumps += 1
                current_end = next_end
        # A single-element array never enters the loop: 0 jumps.
        return jumps
