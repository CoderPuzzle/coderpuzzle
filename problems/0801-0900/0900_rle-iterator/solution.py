from typing import List


class RLEIterator:
    """A cursor over the runs of the encoding: the iterator never decodes
    anything — ``next(n)`` walks forward while the current run's remaining
    count is smaller than ``n``, spending each exhausted run's remainder on
    ``n`` as it passes, then decrements the first run rich enough to supply
    the ``n``-th element and returns that run's value.
    """

    def __init__(self, encoding: List[int]) -> None:
        self.a: List[int] = encoding
        self.i = 0

    def next(self, n: int) -> int:
        # Walk forward while the current run cannot supply the n-th element;
        # a run of length zero never stops this walk (0 is smaller than any n).
        while self.i < len(self.a) and self.a[self.i] < n:
            n -= self.a[self.i]
            self.i += 2
        if self.i >= len(self.a):
            # The walk ran off the end: the n-th element does not exist, and
            # every remaining run was consumed along the way.
            return -1
        self.a[self.i] -= n
        return self.a[self.i + 1]
