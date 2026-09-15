from typing import List, Optional


class Solution:
    def maxSubarraySum(self, nums: List[int]) -> int:
        n = len(nums)
        if n == 1:
            # Deleting the only element is forbidden, so its value stands.
            return nums[0]
        # Per-candidate account: smallest adjusted prefix P(j) minus the |x|'s
        # deleted after j. Key 0 is the plain no-deletion prefix minimum.
        prefix_map = {0: 0}
        prefix_sum = 0
        min_prefix = 0
        # Seeded with nums[0] so all-negative arrays need no zero sentinel.
        result = nums[0]
        for num in nums:
            prefix_sum += num
            # Best subarray ending at r: P(r) minus the smallest adjusted prefix
            # seen so far. Runs before num joins any account, so every anchor
            # strictly precedes r and the subarray is never empty.
            if prefix_sum - min_prefix > result:
                result = prefix_sum - min_prefix
            if num < 0:
                # Only a negative x can help: deleting a positive would only
                # shrink every subarray sum.
                if num in prefix_map:
                    prev = prefix_map[num]
                    if prefix_map[0] < prev:
                        prev = prefix_map[0]
                    # Anchor at min(old account, plain prefix min) and subtract
                    # |x| again: the deletion window may restart at this occurrence.
                    prefix_map[num] = prev + num
                else:
                    # First occurrence: anchor at the best plain prefix minus |x|.
                    prefix_map[num] = prefix_map[0] + num
                if prefix_map[num] < min_prefix:
                    min_prefix = prefix_map[num]
            if prefix_sum < prefix_map[0]:
                prefix_map[0] = prefix_sum
            if prefix_map[0] < min_prefix:
                min_prefix = prefix_map[0]
        return result
