from typing import Optional


class Cell:
    """One link of the chain: a payload plus the rest of the chain."""

    __slots__ = ("val", "next")

    def __init__(self, val: int = 0, next: "Optional[Cell]" = None) -> None:
        self.val = val
        self.next = next


class MyLinkedList:
    """A singly linked list behind a sentinel head, with the length kept in a
    counter so every index check is a comparison instead of a walk: all insert
    positions funnel through addAtIndex, and the boundary rules (index ==
    length appends, index > length is a no-op, invalid reads return -1,
    invalid deletes are skipped) live in exactly one place each.
    """

    def __init__(self) -> None:
        self.head = Cell()  # sentinel: always present, never carries data
        self.size = 0

    def _before(self, index: int) -> Cell:
        """The cell in front of position ``index``, for ``0 <= index <= size``."""
        cell = self.head
        for _ in range(index):
            cell = cell.next
        return cell

    def get(self, index: int) -> int:
        if index < 0 or index >= self.size:
            return -1
        return self._before(index).next.val

    def addAtHead(self, val: int) -> None:
        self.addAtIndex(0, val)

    def addAtTail(self, val: int) -> None:
        self.addAtIndex(self.size, val)

    def addAtIndex(self, index: int, val: int) -> None:
        if index > self.size:
            return
        if index < 0:
            index = 0
        before = self._before(index)
        before.next = Cell(val, before.next)
        self.size += 1

    def deleteAtIndex(self, index: int) -> None:
        if index < 0 or index >= self.size:
            return
        before = self._before(index)
        before.next = before.next.next
        self.size -= 1
