from typing import List, Optional


class SQL:
    def __init__(self, names: List[str], columns: List[int]):
        raise NotImplementedError("TODO")

    def ins(self, name: str, row: List[str]) -> bool:
        raise NotImplementedError("TODO")

    def rmv(self, name: str, rowId: int):
        raise NotImplementedError("TODO")

    def sel(self, name: str, rowId: int, columnId: int) -> str:
        raise NotImplementedError("TODO")

    def exp(self, name: str) -> List[str]:
        raise NotImplementedError("TODO")
