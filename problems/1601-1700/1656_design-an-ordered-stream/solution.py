from typing import List, Optional


class OrderedStream:
    """One slot per id plus ptr, the next id the output is waiting for."""

    def __init__(self, n: int):
        self.slots = [None] * (n + 1)
        self.ptr = 1

    def insert(self, idKey: int, value: str) -> List[str]:
        self.slots[idKey] = value
        chunk = []
        while self.ptr < len(self.slots) and self.slots[self.ptr] is not None:
            chunk.append(self.slots[self.ptr])
            self.ptr += 1
        return chunk
