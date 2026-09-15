import heapq
from typing import List, Set


class PhoneDirectory:
    """A used set, a fresh-number counter, and a released min-heap.

    `get` pops the smallest released number before minting a fresh one,
    so the smallest available number always comes out; `release` hands a
    used number back to the heap and is a no-op on an available one.
    """

    def __init__(self, maxNumbers: int):
        self.limit = maxNumbers
        self.next = 0
        self.used: Set[int] = set()
        self.released: List[int] = []

    def get(self) -> int:
        if self.released:
            # Every released number is smaller than every fresh one, so
            # the heap's minimum is the smallest available number.
            number = heapq.heappop(self.released)
            self.used.add(number)
            return number
        if self.next < self.limit:
            # Fresh numbers are minted in ascending order, so the counter
            # itself needs no bookkeeping.
            number = self.next
            self.next += 1
            self.used.add(number)
            return number
        return -1

    def check(self, number: int) -> bool:
        return number not in self.used

    def release(self, number: int):
        if number in self.used:
            # The used-set guard makes releasing an available number a
            # no-op, so a number never enters the heap twice.
            self.used.remove(number)
            heapq.heappush(self.released, number)
