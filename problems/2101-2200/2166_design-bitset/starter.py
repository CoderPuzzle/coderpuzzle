from typing import List, Optional


class Bitset:
    def __init__(self, size: int):
        raise NotImplementedError("TODO")

    def fix(self, idx: int):
        raise NotImplementedError("TODO")

    def unfix(self, idx: int):
        raise NotImplementedError("TODO")

    def flip(self):
        raise NotImplementedError("TODO")

    def all(self) -> bool:
        raise NotImplementedError("TODO")

    def one(self) -> bool:
        raise NotImplementedError("TODO")

    def count(self) -> int:
        raise NotImplementedError("TODO")

    def toString(self) -> str:
        raise NotImplementedError("TODO")
