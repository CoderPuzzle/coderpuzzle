from typing import List


class Solution:
    def summaryRanges(self, nums: List[int]) -> List[str]:
        ranges: List[str] = []
        total = len(nums)
        i = 0
        while i < total:
            start = i
            # The run extends while the next value is exactly one past the
            # current one. The guard short-circuits, so the +1 is only
            # evaluated when a successor exists — and that successor is
            # strictly larger, capping nums[i] below the 32-bit maximum.
            while i + 1 < total and nums[i + 1] == nums[i] + 1:
                i += 1
            # The run [nums[start], nums[i]] is maximal once the extension
            # stops; equal endpoints collapse to the bare "a" form.
            if nums[start] == nums[i]:
                ranges.append(str(nums[start]))
            else:
                ranges.append(f"{nums[start]}->{nums[i]}")
            i += 1
        return ranges
