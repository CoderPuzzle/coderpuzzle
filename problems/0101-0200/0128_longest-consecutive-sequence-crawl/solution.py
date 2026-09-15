from typing import List


class Solution:
    def longestConsecutive(self, nums: List[int]) -> int:
        # A hash set answers "is this value present?" in O(1); iterating the
        # set itself also collapses duplicates before any walking starts.
        values = set(nums)
        longest = 0
        for value in values:
            # value - 1 absent means value is where its maximal run begins.
            # Skipping every non-initial member is what keeps the walk linear:
            # without the check, each run would be re-traversed by all of its
            # members and the nested loops would go quadratic.
            if value - 1 not in values:
                length = 0
                while value + length in values:
                    length += 1
                longest = max(longest, length)
        return longest
