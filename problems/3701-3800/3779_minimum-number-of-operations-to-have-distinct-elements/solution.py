from typing import List


class Solution:
    def minOperations(self, nums: List[int]) -> int:
        # Pointer + counts: counts tracks the remaining suffix, duplicated
        # how many distinct values it still holds twice or more. While the
        # suffix has a duplicate, one operation advances the pointer by
        # three and refreshes only those three values (the last, possibly
        # shorter, operation removes whatever is left).
        counts = {}
        for v in nums:
            counts[v] = counts.get(v, 0) + 1
        duplicated = sum(1 for c in counts.values() if c >= 2)
        i = 0
        ops = 0
        n = len(nums)
        while i < n and duplicated > 0:
            for j in range(i, min(i + 3, n)):
                counts[nums[j]] -= 1
                if counts[nums[j]] == 1:
                    duplicated -= 1
            i += 3
            ops += 1
        return ops
