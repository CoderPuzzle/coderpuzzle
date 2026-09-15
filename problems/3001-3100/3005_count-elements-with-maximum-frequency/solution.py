from typing import List


class Solution:
    def maxFrequencyElements(self, nums: List[int]) -> int:
        # One pass builds the value -> frequency map; every value whose
        # frequency equals the maximum contributes that many elements.
        frequencies = {}
        for num in nums:
            frequencies[num] = frequencies.get(num, 0) + 1
        maximum = max(frequencies.values())
        return sum(f for f in frequencies.values() if f == maximum)
