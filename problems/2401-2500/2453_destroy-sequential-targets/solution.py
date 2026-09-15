from typing import List


class Solution:
    def destroyTargets(self, nums: List[int], space: int) -> int:
        # Two targets are destroyed by one seed exactly when their values
        # share a residue modulo space (their difference is a multiple of
        # space), so group nums by nums[i] % space. The smallest value of
        # the largest group seeds the machine and wipes the whole group.
        counts = {}
        mins = {}
        for value in nums:
            r = value % space
            counts[r] = counts.get(r, 0) + 1
            if r not in mins or value < mins[r]:
                mins[r] = value
        best = max(counts.values())
        return min(mins[r] for r in counts if counts[r] == best)
