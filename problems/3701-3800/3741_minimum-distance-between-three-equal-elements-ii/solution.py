from typing import List


class Solution:
    def minimumDistance(self, nums: List[int]) -> int:
        # The three pairwise gaps of a good tuple telescope to twice the
        # span between its outermost indices, so the closest tuple is the
        # one whose outermost same-value indices are nearest. Every value
        # gets its own bucket of indices, filled in one left-to-right pass
        # so each bucket comes out sorted for free.
        groups = [[] for _ in range(len(nums) + 1)]
        for index, num in enumerate(nums):
            groups[num].append(index)
        # Inside a sorted bucket no triple beats some consecutive window:
        # the two entries immediately following any entry sit no later than
        # the other two entries of any triple opened there, so their window
        # spans no more.
        best = -1
        for indices in groups:
            for start in range(len(indices) - 2):
                span = indices[start + 2] - indices[start]
                if best == -1 or span < best:
                    best = span
        # The best span stays unset unless some value occurs at least three
        # times; otherwise no good tuple exists.
        return -1 if best == -1 else 2 * best
