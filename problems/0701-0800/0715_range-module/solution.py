from bisect import bisect_left, bisect_right
from typing import List


class RangeModule:
    """Tracked set as canonical disjoint intervals (parallel starts/ends).

    The list stays sorted and gap-separated: adds merge what they overlap or
    touch, removes carve holes, so any fully-tracked query is contained in a
    single stored interval.
    """

    def __init__(self) -> None:
        self.starts: List[int] = []
        self.ends: List[int] = []

    def addRange(self, left: int, right: int) -> None:
        i = bisect_left(self.ends, left)  # first interval ending at/after left
        j = bisect_right(self.starts, right)  # first interval starting after right
        if i < j:
            left = min(left, self.starts[i])
            right = max(right, self.ends[j - 1])
        self.starts[i:j] = [left]
        self.ends[i:j] = [right]

    def queryRange(self, left: int, right: int) -> bool:
        i = bisect_right(self.starts, left) - 1  # last interval starting at/before left
        return i >= 0 and self.ends[i] >= right

    def removeRange(self, left: int, right: int) -> None:
        i = bisect_right(self.ends, left)  # first interval ending after left
        j = bisect_left(self.starts, right)  # first interval starting at/after right
        new_starts = []
        new_ends = []
        if i < j:
            if self.starts[i] < left:
                new_starts.append(self.starts[i])
                new_ends.append(left)
            if self.ends[j - 1] > right:
                new_starts.append(right)
                new_ends.append(self.ends[j - 1])
        self.starts[i:j] = new_starts
        self.ends[i:j] = new_ends
