from typing import List


class MovingAverage:
    """A fixed ring buffer plus a running sum.

    `next` writes the incoming value over the window's oldest slot,
    folds the evicted value out of the sum and the new one in, and
    returns `sum / count` — the sum stays an exact integer and only
    the final step is a division.
    """

    def __init__(self, size: int) -> None:
        self.window: List[int] = [0] * size
        self.capacity = size
        self.count = 0
        self.head = 0
        self.total = 0

    def next(self, val: int) -> float:
        # The head slot holds the oldest value once the window is full;
        # before that the window is still filling and nothing evicts.
        if self.count < self.capacity:
            self.count += 1
        else:
            self.total -= self.window[self.head]
        self.window[self.head] = val
        self.total += val
        self.head = (self.head + 1) % self.capacity
        return self.total / self.count
