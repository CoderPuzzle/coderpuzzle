from typing import List, Optional


class Solution:
    def minDistinctFreqPair(self, nums: List[int]) -> List[int]:
        # freq maps each value to how often it appears in nums.
        freq = {}
        for x in nums:
            freq[x] = freq.get(x, 0) + 1
        values = sorted(freq)
        # If any valid pair exists, its x is always the smallest distinct
        # value: if every larger value shared freq[x], all of nums would
        # share one frequency and no pair could differ. So one scan past
        # values[0] finds the smallest qualifying y.
        x = values[0]
        for y in values:
            if y > x and freq[y] != freq[x]:
                return [x, y]
        return [-1, -1]
