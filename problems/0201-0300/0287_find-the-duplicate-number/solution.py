from typing import List, Optional


class Solution:
    def findDuplicate(self, nums: List[int]) -> int:
        # Read the array as a linked list: index i points to nums[i]. The
        # duplicate is the cycle entry, since two indices point at it.
        slow = fast = 0
        while True:
            # Tortoise hops once, hare twice; both start at index 0, which
            # cannot lie inside the cycle because no value equals 0.
            slow = nums[slow]
            fast = nums[nums[fast]]
            if slow == fast:
                break
        # mu == lambda (mod cycle length), so advancing both one step at
        # a time makes them meet exactly at the cycle's entry node.
        slow = 0
        while slow != fast:
            slow = nums[slow]
            fast = nums[fast]
        # The entry index is the duplicated value.
        return slow
