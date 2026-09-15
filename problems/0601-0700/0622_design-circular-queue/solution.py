from typing import List


class MyCircularQueue:
    """A fixed buffer, a head index, and an occupied count.

    The count (not a tail index) is what distinguishes full from empty,
    so all k slots are usable; the tail position is always derivable as
    `(head + count) % k`.
    """

    def __init__(self, k: int):
        self.buf: List[int] = [0] * k
        self.head = 0
        self.count = 0

    def enQueue(self, value: int) -> bool:
        if self.count == len(self.buf):
            return False
        # The write slot is one past the current rear, modulo the ring.
        self.buf[(self.head + self.count) % len(self.buf)] = value
        self.count += 1
        return True

    def deQueue(self) -> bool:
        if self.count == 0:
            return False
        # Nothing to erase: the old head slot is simply written over
        # once the ring wraps back to it.
        self.head = (self.head + 1) % len(self.buf)
        self.count -= 1
        return True

    def Front(self) -> int:
        if self.count == 0:
            return -1
        return self.buf[self.head]

    def Rear(self) -> int:
        if self.count == 0:
            return -1
        return self.buf[(self.head + self.count - 1) % len(self.buf)]

    def isEmpty(self) -> bool:
        return self.count == 0

    def isFull(self) -> bool:
        return self.count == len(self.buf)
