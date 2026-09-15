from typing import List


class Solution:
    def incremovableSubarrayCount(self, nums: List[int]) -> int:
        # A removal [l, r] is incremovable iff the prefix nums[:l] and the
        # suffix nums[r+1:] are strictly increasing and the seam holds
        # (nums[l-1] < nums[r+1], unless one side is empty). Group removals
        # by kept prefix length p = l: the kept suffix must start at some
        # s >= p + 1 (non-empty removal) inside the maximal strictly
        # increasing suffix that starts at y, and its first value must
        # exceed nums[p - 1]. Since nums[0..x] (the maximal increasing
        # prefix) makes nums[p - 1] grow with p, the smallest valid s only
        # moves right, so one shared pointer sweeps the suffix once. The
        # count reaches n * (n + 1) / 2 = 5,000,050,000 for the sorted
        # array, so 64-bit accumulators are required; the value stays far
        # below 2^53 for JavaScript numbers.
        n = len(nums)
        x = 0
        while x + 1 < n and nums[x] < nums[x + 1]:
            x += 1
        y = n - 1
        while y > 0 and nums[y - 1] < nums[y]:
            y -= 1
        total = 0
        s = y
        for p in range(x + 2):
            if s < p + 1:
                s = p + 1
            if p > 0:
                while s < n and nums[s] <= nums[p - 1]:
                    s += 1
            total += n - s + 1
        return total
