class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        # The set collapses duplicates and makes membership an O(1) test.
        values = set(nums)
        best = 0
        for value in values:
            # Only a true run start (no value - 1 present) triggers a walk;
            # each maximal run has exactly one such start, which keeps the
            # nested loop linear: every element is touched at most twice.
            if value - 1 not in values:
                length = 1
                # Walk upward through the run without sorting anything.
                while value + length in values:
                    length += 1
                best = max(best, length)
        return best
