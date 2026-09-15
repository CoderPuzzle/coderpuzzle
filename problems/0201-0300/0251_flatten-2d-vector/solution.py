from typing import List


class Vector2D:
    """Two coordinates — a row pointer and a column pointer — advanced
    lazily over the vector exactly as it stands: the pair is only moved
    onto a live element when a call needs one, so construction does no
    work beyond remembering the input.

    `hasNext` owns the skipping: it walks `row` past every row the column
    pointer has exhausted (empty from the start, or fully served), which
    lets `next` read `vec[row][col]` without any special cases.
    """

    def __init__(self, vec: List[List[int]]) -> None:
        # No flattened copy here — that laziness is the problem. An empty
        # (or exhausted) row is stepped over only when a call forces it.
        self.vec = vec
        self.row = 0
        self.col = 0

    def next(self) -> int:
        # Establish the invariant before reading: after this call the
        # coordinates are guaranteed to sit on a live element.
        self.hasNext()
        value = self.vec[self.row][self.col]
        # Step within the row; once it runs dry, the next hasNext() moves
        # on to the next row instead.
        self.col += 1
        return value

    def hasNext(self) -> bool:
        # The invariant repair: skip rows already drained, zeroing the
        # column pointer as each new row is entered.
        while self.row < len(self.vec) and self.col == len(self.vec[self.row]):
            self.row += 1
            self.col = 0
        return self.row < len(self.vec)
