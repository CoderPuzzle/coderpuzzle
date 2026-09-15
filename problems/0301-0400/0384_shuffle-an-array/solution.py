import random


class Solution:
    """The pristine original is kept untouched; every shuffle() runs
    Fisher-Yates on a fresh copy — slot i (from the top down) swaps with a
    uniformly chosen slot in [0, i] — so each of the n! orderings is exactly
    equally likely, and reset() is a plain copy."""

    def __init__(self, nums: list[int]) -> None:
        self.original: list[int] = list(nums)

    def reset(self) -> list[int]:
        return list(self.original)

    def shuffle(self) -> list[int]:
        array = list(self.original)
        for i in range(len(array) - 1, 0, -1):
            j = random.randrange(i + 1)
            array[i], array[j] = array[j], array[i]
        return array
