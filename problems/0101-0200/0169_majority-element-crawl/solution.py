from typing import List


class Solution:
    def majorityElement(self, nums: List[int]) -> int:
        # Boyer-Moore voting: one candidate, one counter. A match raises the
        # counter, a mismatch spends it; at zero the candidate is swapped for
        # the current element.
        candidate = nums[0]
        count = 0
        for value in nums:
            if count == 0:
                candidate = value
            count += 1 if value == candidate else -1
        # Every cancellation removes one majority and one minority element, and
        # the majority holds more than half the array, so it always survives.
        return candidate
