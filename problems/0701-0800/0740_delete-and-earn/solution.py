from typing import List, Optional


class Solution:
    def deleteAndEarn(self, nums: List[int]) -> int:
        # Deleting one copy of v removes its neighbors for free, so a strategy
        # just picks distinct values, earning v * count[v] each — house-robber
        # over the sorted distinct values.
        count = {}
        for v in nums:
            count[v] = count.get(v, 0) + 1
        take = 0
        skip = 0
        prev_value = None
        for value in sorted(count):
            # Adjacent predecessor conflicts with its take; a gap (missing v-1)
            # makes taking v conflict with nothing, so both states carry in.
            base = skip if prev_value == value - 1 else max(take, skip)
            take, skip = base + value * count[value], max(take, skip)
            prev_value = value
        return max(take, skip)
