class Solution:
    def longestConsecutive(self, nums: list[int]) -> int:
        # Sorted copy: duplicates become neighbours and every maximal chain
        # becomes one contiguous run of +1 steps, so a single walk measures
        # them all.
        ordered = sorted(nums)
        best = 0
        run = 0
        previous = None
        for value in ordered:
            if previous is None or value > previous + 1:
                # A gap of two or more (or the very first entry) starts a
                # fresh chain.
                run = 1
            elif value == previous + 1:
                run += 1
            # An equal value is a duplicate of one already counted: the run
            # keeps its length.
            previous = value
            best = max(best, run)
        # An empty array never enters the loop, so 0 falls out for free.
        return best
