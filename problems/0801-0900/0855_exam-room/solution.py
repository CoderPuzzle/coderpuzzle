import heapq
from bisect import bisect_left, insort
from typing import List, Set, Tuple


class ExamRoom:
    """Max-heap of free-gap segments between occupied seats, lazily deleted.

    A segment (l, r) spans adjacent occupied seats l and r (sentinels -1 and
    n at the edges); its candidate seat and distance are pure functions of
    the pair, so stale heap entries are skipped via the live-segment set.
    """

    def __init__(self, n: int) -> None:
        self.n = n
        self.occupied: List[int] = []
        self.live: Set[Tuple[int, int]] = set()
        self.heap: List[Tuple[int, int, int, int]] = []  # (-dist, seat, l, r)

    def seat(self) -> int:
        if not self.occupied:
            self.occupied.append(0)
            self._add_segment(0, self.n)
            return 0
        while self.heap:
            _, seat, l, r = heapq.heappop(self.heap)
            if (l, r) not in self.live:
                continue  # stale entry
            self.live.discard((l, r))
            insort(self.occupied, seat)
            self._add_segment(l, seat)
            self._add_segment(seat, r)
            return seat
        raise AssertionError("no seat available")

    def leave(self, p: int) -> None:
        index = bisect_left(self.occupied, p)
        self.occupied.pop(index)
        prev = self.occupied[index - 1] if index > 0 else -1
        nxt = self.occupied[index] if index < len(self.occupied) else self.n
        self.live.discard((prev, p))
        self.live.discard((p, nxt))
        if self.occupied and nxt - prev >= 2:
            self._add_segment(prev, nxt)

    def _add_segment(self, l: int, r: int) -> None:
        if r - l < 2:
            return  # no free seat strictly between
        if l == -1:
            dist, seat = r, 0
        elif r == self.n:
            dist, seat = self.n - 1 - l, self.n - 1
        else:
            seat = (l + r) // 2
            dist = (r - l) // 2
        self.live.add((l, r))
        heapq.heappush(self.heap, (-dist, seat, l, r))
