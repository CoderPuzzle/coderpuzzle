from typing import List


class Solution:
    def minimumDifference(self, nums: List[int], k: int) -> int:
        # Seed from the first element so single-element subarrays are covered.
        best = abs(nums[0] - k)
        # Empty-subarray seed: 0 | v = v lets the first build produce {v}.
        current = {0}
        # OR never clears bits, so the nested frontier holds at most ~31 values.
        for value in nums:
            # New frontier: {value} plus every previous OR extended by value.
            nxt = {value}
            for prev in current:
                nxt.add(prev | value)
            current = nxt
            for x in current:
                diff = abs(x - k)
                if diff < best:
                    best = diff
        return best
