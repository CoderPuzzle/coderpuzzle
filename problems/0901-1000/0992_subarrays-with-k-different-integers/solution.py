from typing import List


class Solution:
    def subarraysWithKDistinct(self, nums: List[int], k: int) -> int:
        """A window holding exactly k distinct values has no monotone shrink
        rule — it can be too wide or too narrow from either side — but a
        window holding at most t distinct values does. Count the subarrays
        with at most k distinct values, subtract those with at most k - 1,
        and exactly k is what remains.
        """

        def at_most(limit: int) -> int:
            freq = [0] * (len(nums) + 1)  # values lie in [1, n]
            distinct = 0
            left = 0
            total = 0
            for right, value in enumerate(nums):
                if freq[value] == 0:
                    distinct += 1
                freq[value] += 1
                while distinct > limit:
                    leaving = nums[left]
                    freq[leaving] -= 1
                    if freq[leaving] == 0:
                        distinct -= 1
                    left += 1
                # every suffix of an at-most window also qualifies, so the
                # window's length counts the subarrays ending at right
                total += right - left + 1
            return total

        return at_most(k) - at_most(k - 1)
