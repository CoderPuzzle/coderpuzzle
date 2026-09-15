from typing import List, Optional


class SnapshotArray:
    def __init__(self, length: int):
        raise NotImplementedError("TODO")

    def set(self, index: int, val: int):
        raise NotImplementedError("TODO")

    def snap(self) -> int:
        raise NotImplementedError("TODO")

    def get(self, index: int, snap_id: int) -> int:
        raise NotImplementedError("TODO")
