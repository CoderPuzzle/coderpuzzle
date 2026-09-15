from typing import List


class Solution:
    def minimumIndex(self, nums: List[int]) -> int:
        # One pass tallies every value; the promised sole dominant is the
        # value whose tally ends largest. Only the dominant can anchor a
        # valid split: a value dominating both halves holds more than half
        # of each, and doubling and adding the two inequalities gives more
        # than half of the whole array.
        counts: dict[int, int] = {}
        dominant, frequency = nums[0], 0
        for num in nums:
            counts[num] = counts.get(num, 0) + 1
            if counts[num] > frequency:
                dominant, frequency = num, counts[num]
        # Second sweep carries prefix, the count of dominant copies so far.
        # Splitting after i, the prefix holds i + 1 elements and the suffix
        # n - i - 1; both comparisons are strict, so a tally tying its
        # half's length does not dominate.
        prefix = 0
        for i in range(len(nums) - 1):
            if nums[i] == dominant:
                prefix += 1
            if prefix * 2 > i + 1 and (frequency - prefix) * 2 > len(nums) - i - 1:
                return i
        return -1
