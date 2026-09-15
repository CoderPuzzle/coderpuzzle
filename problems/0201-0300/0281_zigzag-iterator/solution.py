from typing import List


class ZigzagIterator:
    """Two read positions — one per vector — and a turn flag naming the
    vector that serves next. Nothing is flattened or queued at
    construction: the whole zigzag policy lives in `next`, which hands
    the turn to the other vector when the one whose turn it is has run
    dry.

    `hasNext` is a pure query — one live index anywhere means elements
    remain — so it never mutates state, and any number of calls between
    `next`s is harmless.
    """

    def __init__(self, v1: List[int], v2: List[int]) -> None:
        # No copies, no queue: only how far each vector has been served
        # (i1, i2) and whose turn is next (0 for v1, 1 for v2).
        self.v1 = v1
        self.v2 = v2
        self.i1 = 0
        self.i2 = 0
        self.turn = 0

    def next(self) -> int:
        # A vector whose turn it is may have run dry — it was the shorter
        # one, or its last element was just served — and then the turn
        # passes to the other before anything is read.
        if self.turn == 0 and self.i1 == len(self.v1):
            self.turn = 1
        if self.turn == 1 and self.i2 == len(self.v2):
            self.turn = 0
        if self.turn == 0:
            value = self.v1[self.i1]
            self.i1 += 1
        else:
            value = self.v2[self.i2]
            self.i2 += 1
        # Serve one element, then hand the turn over unconditionally: the
        # vectors alternate strictly while both still have elements.
        self.turn = 1 - self.turn
        return value

    def hasNext(self) -> bool:
        # Pure query: the turn flag is irrelevant to whether anything
        # remains — one live index anywhere means yes.
        return self.i1 < len(self.v1) or self.i2 < len(self.v2)
