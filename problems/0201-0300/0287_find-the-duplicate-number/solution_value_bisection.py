class Solution:
    def findDuplicate(self, nums: list[int]) -> int:
        # Bisect the value range 1..n instead of chasing pointers: count(x),
        # the number of entries <= x, exceeds x exactly when the duplicate
        # is <= x, so the smallest overloaded value is the answer.
        n = len(nums) - 1
        lo, hi = 1, n
        while lo < hi:
            mid = (lo + hi) // 2
            # Pigeonhole: at most mid entries can be <= mid while all their
            # values are distinct, so an excess count pins the repeat to the
            # lower half and a shortfall pins it above mid.
            count = sum(value <= mid for value in nums)
            if count > mid:
                hi = mid
            else:
                lo = mid + 1
        # The bounds meet on the repeated value.
        return lo
