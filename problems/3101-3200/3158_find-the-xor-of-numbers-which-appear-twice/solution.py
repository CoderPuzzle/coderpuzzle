from typing import List


class Solution:
    def duplicateNumbersXOR(self, nums: List[int]) -> int:
        # One pass with a value -> count tally; values seen exactly twice
        # contribute to the XOR. XOR is its own inverse and self-canceling,
        # so values occurring once must be excluded by the count, not
        # folded in blindly.
        counts = {}
        for value in nums:
            counts[value] = counts.get(value, 0) + 1
        answer = 0
        for value, count in counts.items():
            if count == 2:
                answer ^= value
        return answer
