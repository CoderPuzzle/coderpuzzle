from typing import List


class Solution:
    def minLengthAfterRemovals(self, nums: List[int]) -> int:
        # Each operation removes two elements of DIFFERENT values, so a
        # fixed value loses at most one copy per operation and no
        # schedule beats n - m operations, where m is the multiplicity
        # of the most frequent value (nor n // 2). The bound is reached
        # by repeatedly removing one element from the currently largest
        # value group and one from another group, so the answer is
        # n - 2 * min(n // 2, n - m), which simplifies to
        # max(n % 2, 2 * m - n). nums is sorted, so m is just the
        # longest run of equal elements, found in one scan. Every
        # quantity here stays far inside signed 32-bit range.
        n = len(nums)
        best = 1
        run = 1
        for i in range(1, n):
            run = run + 1 if nums[i] == nums[i - 1] else 1
            best = max(best, run)
        return max(n % 2, 2 * best - n)
