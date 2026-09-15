import random


class Solution:
    """One pass buckets the indices of every value; pick(target) draws one
    of that value's index buckets uniformly, so each qualifying index is
    exactly equally likely."""

    def __init__(self, nums: list[int]) -> None:
        self.positions: dict[int, list[int]] = {}
        for index, value in enumerate(nums):
            self.positions.setdefault(value, []).append(index)

    def pick(self, target: int) -> int:
        indices = self.positions[target]
        return indices[random.randrange(len(indices))]
