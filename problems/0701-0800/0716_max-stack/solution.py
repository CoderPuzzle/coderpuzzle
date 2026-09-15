import heapq
from typing import Optional


class MaxStack:
    """A doubly-linked list of cells keeps stack order -- the tail is the top,
    so push, pop, and top touch only the tail cell -- while a max-heap of
    cells keyed by (value, sequence number) finds the maximum. Sequence
    numbers rise with every push and the heap prefers the larger one among
    equal values, so its top is the topmost duplicate maximum -- exactly the
    element popMax must remove. A removal elsewhere in the list leaves the
    cell's heap entry stale, so each cell carries an alive flag and
    peekMax/popMax discard heap tops that name a dead cell: every stale
    entry is skipped at most once.
    """

    def __init__(self) -> None:
        self.tail: Optional[_Cell] = None
        self.heap = []  # (-value, -seq, cell); seq is unique, so cells never compare
        self.seq = 0

    def push(self, x: int) -> None:
        self.seq += 1
        cell = _Cell(x, self.seq, self.tail)
        if self.tail is not None:
            self.tail.next = cell
        self.tail = cell
        heapq.heappush(self.heap, (-x, -self.seq, cell))

    def pop(self) -> int:
        cell = self.tail
        self._unlink(cell)
        return cell.value

    def top(self) -> int:
        return self.tail.value

    def peekMax(self) -> int:
        while self.heap[0][2].dead:
            heapq.heappop(self.heap)
        return -self.heap[0][0]

    def popMax(self) -> int:
        while True:
            _value, _seq, cell = heapq.heappop(self.heap)
            if not cell.dead:
                self._unlink(cell)
                return cell.value

    def _unlink(self, cell: "_Cell") -> None:
        if cell.prev is not None:
            cell.prev.next = cell.next
        if cell.next is not None:
            cell.next.prev = cell.prev
        if self.tail is cell:
            self.tail = cell.prev
        cell.dead = True


class _Cell:
    __slots__ = ("value", "seq", "prev", "next", "dead")

    def __init__(self, value: int, seq: int, prev: Optional["_Cell"]) -> None:
        self.value = value
        self.seq = seq
        self.prev = prev
        self.next: Optional[_Cell] = None
        self.dead = False
