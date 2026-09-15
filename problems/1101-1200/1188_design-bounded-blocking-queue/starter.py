from typing import List, Optional


class BoundedBlockingQueue:
    def __init__(self, capacity: int) -> None:
        raise NotImplementedError("TODO")

    def enqueue(self, element: int) -> None:
        raise NotImplementedError("TODO")

    def dequeue(self) -> int:
        raise NotImplementedError("TODO")

    def size(self) -> int:
        raise NotImplementedError("TODO")
