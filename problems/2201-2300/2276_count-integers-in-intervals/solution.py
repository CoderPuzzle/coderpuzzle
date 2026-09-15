from bisect import bisect_left, bisect_right


class CountIntervals:
    def __init__(self) -> None:
        self.starts: list[int] = []
        self.ends: list[int] = []
        self.covered = 0

    def add(self, left: int, right: int) -> None:
        starts, ends = self.starts, self.ends
        # intervals with start <= right occupy [0, hi); disjoint and sorted,
        # their ends are sorted too, so those reaching [left, ...] are the
        # suffix [lo, hi)
        hi = bisect_right(starts, right)
        lo = min(bisect_left(ends, left), hi)
        if lo < hi:
            left = min(left, starts[lo])
            right = max(right, ends[hi - 1])
            for index in range(lo, hi):
                self.covered -= ends[index] - starts[index] + 1
            del starts[lo:hi]
            del ends[lo:hi]
        starts.insert(lo, left)
        ends.insert(lo, right)
        self.covered += right - left + 1

    def count(self) -> int:
        return self.covered
