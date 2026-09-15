from typing import List


class Solution:
    def containsNearbyAlmostDuplicate(self, nums: List[int], indexDiff: int, valueDiff: int) -> bool:
        # Value buckets of width valueDiff + 1, keyed by floor division: two
        # values in one bucket are within valueDiff by construction, so each
        # bucket holds at most one live value and a same-bucket hit is a "yes".
        width = valueDiff + 1
        buckets = {}
        for index, value in enumerate(nums):
            if index > indexDiff:
                # The window spans only the previous indexDiff positions;
                # retire the bucket of the value that just fell out of it.
                del buckets[nums[index - indexDiff - 1] // width]
            bucket = value // width
            if bucket in buckets:
                return True
            # Neighbor buckets can hold values up to 2*valueDiff away, so
            # their occupants need a real distance comparison.
            neighbor = buckets.get(bucket - 1)
            if neighbor is not None and value - neighbor <= valueDiff:
                return True
            neighbor = buckets.get(bucket + 1)
            if neighbor is not None and neighbor - value <= valueDiff:
                return True
            buckets[bucket] = value
        return False
