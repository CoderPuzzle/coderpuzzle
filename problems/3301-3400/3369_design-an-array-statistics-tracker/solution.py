import heapq
from collections import Counter, deque
from typing import List


class StatisticsTracker:
    """Every statistic lives in its own incrementally maintained
    structure: a deque holds arrival order, a running sum serves the
    mean, two heaps split the live values into a lower and an upper half
    so the median is always at a top, and a (-count, value) heap answers
    the mode. Removals are FIFO and arbitrary for a heap, so an erased
    value is only marked in a delayed counter and discarded when it
    surfaces at a top; rebalancing counts only live entries, and the
    mode heap's stale entries are skipped lazily the same way. Each call
    costs O(log n) amortized."""

    def __init__(self):
        self.queue = deque()
        self.total = 0
        self.small = []  # max-heap (negated): the lower half
        self.large = []  # min-heap: the upper half
        self.small_size = 0  # live sizes, ghosts excluded
        self.large_size = 0
        self.delayed = Counter()  # removals not yet applied to a heap
        self.counts = Counter()
        self.mode_heap = []  # (-count, value)

    def _prune(self, heap, sign):
        # Discard ghosts queued for deletion while they sit at the top;
        # sign flips the negation for the max-heap side.
        while heap:
            value = heap[0] * sign
            if self.delayed[value]:
                self.delayed[value] -= 1
                heapq.heappop(heap)
            else:
                break

    def _rebalance(self):
        # Keep ceil(n/2) live values in small; the median read sits at a
        # top after this. Moves only touch pruned, live tops.
        if self.small_size > self.large_size + 1:
            heapq.heappush(self.large, -heapq.heappop(self.small))
            self.small_size -= 1
            self.large_size += 1
            self._prune(self.small, -1)
        elif self.small_size < self.large_size:
            heapq.heappush(self.small, -heapq.heappop(self.large))
            self.small_size += 1
            self.large_size -= 1
            self._prune(self.large, 1)

    def addNumber(self, number: int) -> None:
        self.queue.append(number)
        self.total += number
        self.counts[number] += 1
        # An entry exists for every count level each value reaches, so
        # the current count of any live value is always in the heap.
        heapq.heappush(self.mode_heap, (-self.counts[number], number))
        if not self.small or number <= -self.small[0]:
            heapq.heappush(self.small, -number)
            self.small_size += 1
        else:
            heapq.heappush(self.large, number)
            self.large_size += 1
        self._rebalance()

    def removeFirstAddedNumber(self) -> None:
        number = self.queue.popleft()
        self.total -= number
        self.counts[number] -= 1
        # The ghost is charged to the half its value belongs to; when a
        # matching copy surfaces at that top it is discarded, which keeps
        # fungible duplicates consistent.
        self.delayed[number] += 1
        if number <= -self.small[0]:
            self.small_size -= 1
            if number == -self.small[0]:
                self._prune(self.small, -1)
        else:
            self.large_size -= 1
            if number == self.large[0]:
                self._prune(self.large, 1)
        self._rebalance()

    def getMean(self) -> int:
        return self.total // len(self.queue)

    def getMedian(self) -> int:
        self._prune(self.small, -1)
        self._prune(self.large, 1)
        if self.small_size > self.large_size:
            return -self.small[0]
        # Even count: the larger of the two middles is the upper half's
        # minimum.
        return self.large[0]

    def getMode(self) -> int:
        while self.mode_heap:
            count, value = self.mode_heap[0]
            if self.counts[value] == -count:
                return value
            heapq.heappop(self.mode_heap)
        raise AssertionError("empty tracker")
