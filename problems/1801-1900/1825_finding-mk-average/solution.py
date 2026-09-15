from collections import deque
from typing import List


class MKAverage:
    """Two Fenwick trees indexed by value — one of counts, one of sums —
    hold the current m-wide window, alongside the window itself in arrival
    order. addElement inserts the new value and, once the window is full,
    removes the value that just slid out; both are O(log V). A query
    descends the count tree twice to read off the combined value of the j
    smallest elements for j = k and j = m - k, so the trimmed middle sum
    is S(m-k) - S(k) and the answer is that sum floor-divided by m - 2k,
    or -1 while the stream is still shorter than m.
    """

    LIMIT = 100000

    def __init__(self, m: int, k: int):
        self.m = m
        self.k = k
        self.counts = [0] * (self.LIMIT + 1)
        self.sums = [0] * (self.LIMIT + 1)
        self.window = deque()
        self.size = 0

    def _update(self, tree: List[int], value: int, delta: int) -> None:
        while value <= self.LIMIT:
            tree[value] += delta
            value += value & -value

    def addElement(self, num: int) -> None:
        self.window.append(num)
        self._update(self.counts, num, 1)
        self._update(self.sums, num, num)
        self.size += 1
        if self.size > self.m:
            # The window holds exactly the last m elements: evict the oldest.
            old = self.window.popleft()
            self._update(self.counts, old, -1)
            self._update(self.sums, old, -old)
            self.size -= 1

    def _smallest_sum(self, j: int) -> int:
        # Descend the count tree to the value holding the j-th smallest
        # element, accumulating the sums of fully covered buckets.
        index, taken, total = 0, 0, 0
        step = 1 << 16  # largest power of two <= LIMIT
        while step:
            nxt = index + step
            if nxt <= self.LIMIT and taken + self.counts[nxt] < j:
                index = nxt
                taken += self.counts[nxt]
                total += self.sums[nxt]
            step >>= 1
        return total + (index + 1) * (j - taken)

    def calculateMKAverage(self) -> int:
        if self.size < self.m:
            return -1
        middle = self._smallest_sum(self.m - self.k) - self._smallest_sum(self.k)
        return middle // (self.m - 2 * self.k)
