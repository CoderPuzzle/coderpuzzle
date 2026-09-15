from typing import List


class MyCircularDeque:
    """A fixed buffer, a head index, and an occupied count.

    The count (not a tail index) is what distinguishes full from empty,
    so all k slots are usable; both ends are derivable, the rear sits at
    `(head + count - 1) % k` and the slot a front insert claims at
    `(head - 1) % k`.
    """

    def __init__(self, k: int):
        self.buf: List[int] = [0] * k
        self.head = 0
        self.count = 0

    def insertFront(self, value: int) -> bool:
        if self.count == len(self.buf):
            return False
        # Step head back one slot, modulo the ring, and write there.
        self.head = (self.head - 1) % len(self.buf)
        self.buf[self.head] = value
        self.count += 1
        return True

    def insertLast(self, value: int) -> bool:
        if self.count == len(self.buf):
            return False
        # The write slot is one past the current rear, modulo the ring.
        self.buf[(self.head + self.count) % len(self.buf)] = value
        self.count += 1
        return True

    def deleteFront(self) -> bool:
        if self.count == 0:
            return False
        # Nothing to erase: the old head slot is simply written over
        # once the ring wraps back to it.
        self.head = (self.head + 1) % len(self.buf)
        self.count -= 1
        return True

    def deleteLast(self) -> bool:
        if self.count == 0:
            return False
        # The rear slot is derivable, so retiring it is just a count.
        self.count -= 1
        return True

    def getFront(self) -> int:
        if self.count == 0:
            return -1
        return self.buf[self.head]

    def getRear(self) -> int:
        if self.count == 0:
            return -1
        return self.buf[(self.head + self.count - 1) % len(self.buf)]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == len(self.buf)
