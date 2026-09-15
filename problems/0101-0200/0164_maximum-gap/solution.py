from typing import List


class Solution:
    def maximumGap(self, nums: List[int]) -> int:
        if len(nums) < 2:
            # No pair of successive elements exists.
            return 0
        lo, hi = min(nums), max(nums)
        if lo == hi:
            # Equal extremes mean every value is identical: all gaps are 0.
            return 0
        count = len(nums) - 1
        # Bucket width ceil(span/count): the average sorted gap is
        # span/count, so the maximum gap — an integer — is at least this
        # wide, and no gap inside a single bucket (spread <= width - 1)
        # can be the answer.
        width = (hi - lo + count - 1) // count
        bucket_min = [None] * (count + 1)
        bucket_max = [None] * (count + 1)
        for value in nums:
            # Pure division into [lo, hi] — lo lands in bucket 0, hi in
            # bucket count at most, and no multiplication can overflow.
            index = (value - lo) // width
            if bucket_min[index] is None or value < bucket_min[index]:
                bucket_min[index] = value
            if bucket_max[index] is None or value > bucket_max[index]:
                bucket_max[index] = value
        best = 0
        # Bucket 0 holds lo, so it is never empty.
        previous_max = bucket_max[0]
        for index in range(1, count + 1):
            if bucket_min[index] is None:
                # Empty bucket: the measured jump only grows wider, and
                # the neighbours are successive in sorted order.
                continue
            best = max(best, bucket_min[index] - previous_max)
            previous_max = bucket_max[index]
        return best
