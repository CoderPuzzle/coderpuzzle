from typing import List, Optional


class LockingTree:
    def __init__(self, parent: List[int]):
        raise NotImplementedError("TODO")

    def lock(self, num: int, user: int) -> bool:
        raise NotImplementedError("TODO")

    def unlock(self, num: int, user: int) -> bool:
        raise NotImplementedError("TODO")

    def upgrade(self, num: int, user: int) -> bool:
        raise NotImplementedError("TODO")
