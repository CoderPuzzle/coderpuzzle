from typing import List


class Solution:
    def countCompleteSubarrays(self, nums: List[int]) -> int:
        def at_most(limit: int) -> int:
            # Number of subarrays holding at most `limit` distinct values,
            # counted by right endpoint with a forward-only left boundary.
            freq = {}
            distinct = 0
            left = 0
            count = 0
            for right, value in enumerate(nums):
                freq[value] = freq.get(value, 0) + 1
                if freq[value] == 1:
                    distinct += 1
                while distinct > limit:
                    freq[nums[left]] -= 1
                    if freq[nums[left]] == 0:
                        distinct -= 1
                    left += 1
                # every start in [left, right] keeps the window within limit
                # (limit 0 shrinks every window empty, contributing nothing)
                count += right - left + 1
            return count

        total_distinct = len(set(nums))
        # A subarray is complete exactly when it holds every distinct value of
        # the whole array: atMost(k) counts it, atMost(k - 1) does not.
        return at_most(total_distinct) - at_most(total_distinct - 1)
