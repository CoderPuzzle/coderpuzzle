from typing import List, Optional


class PeekingIterator:
    """One cached element standing in for "the future": the constructor
    advances the underlying cursor once and parks the element it lands on,
    so every call answers from the present — peek reads that parked element,
    next hands it over and refills it with one more cursor advance.
    """

    def __init__(self, nums: List[int]) -> None:
        self.nums = nums
        # The cursor sits one past the element held in the cache — this
        # single advance at construction is what makes peek possible.
        self.index = 1
        self.cache: Optional[int] = nums[0]

    def next(self) -> int:
        # Hand over the cached element, then refill the cache with one more
        # cursor advance (to None once the sequence runs dry).
        value = self.cache
        self.cache = self.nums[self.index] if self.index < len(self.nums) else None
        self.index += 1
        return value

    def hasNext(self) -> bool:
        # The cache IS the hasNext answer: something is waiting exactly
        # when the parked element exists.
        return self.cache is not None

    def peek(self) -> int:
        # The whole design in one line — the future is already in hand, so
        # looking at it costs nothing and moves nothing.
        return self.cache
