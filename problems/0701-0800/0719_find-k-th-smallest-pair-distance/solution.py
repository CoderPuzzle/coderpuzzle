from typing import List


class Solution:
    def smallestDistancePair(self, nums: List[int], k: int) -> int:
        nums = sorted(nums)
        n = len(nums)

        # Pairs within dist, counted on the sorted array with two pointers:
        # j only moves forward across the whole scan (never restarts per i).
        def count_le(dist):
            cnt = 0
            j = 0
            for i in range(n):
                while j < n and nums[j] - nums[i] <= dist:
                    j += 1
                # Later elements within dist of nums[i]; j - i - 1 of them.
                cnt += j - i - 1
            return cnt

        # The count is monotone in dist, so binary search the distance itself
        # over [0, max - min]; the converged value is a real pair distance.
        lo, hi = 0, nums[-1] - nums[0]
        while lo < hi:
            mid = (lo + hi) // 2
            # At least k pairs qualify: the kth smallest is mid or smaller.
            if count_le(mid) >= k:
                hi = mid
            else:
                lo = mid + 1
        return lo
