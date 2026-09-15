from typing import List


class Solution:
    def numberOfEmployeesWhoMetTarget(self, hours: List[int], target: int) -> int:
        # One pass bumps a counter whenever hours[i] >= target; "at least"
        # makes equal-to-target count, which is what Example 1 pins down.
        met = 0
        for worked in hours:
            if worked >= target:
                met += 1
        return met
