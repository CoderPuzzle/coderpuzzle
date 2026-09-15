from typing import List, Optional


class Excel:
    def __init__(self, height: int, width: str):
        raise NotImplementedError("TODO")

    def set(self, row: int, column: str, val: int):
        raise NotImplementedError("TODO")

    def get(self, row: int, column: str) -> int:
        raise NotImplementedError("TODO")

    def sum(self, row: int, column: str, numbers: List[str]) -> int:
        raise NotImplementedError("TODO")
