from typing import List, Optional


class Spreadsheet:
    def __init__(self, rows: int):
        raise NotImplementedError("TODO")

    def setCell(self, cell: str, value: int):
        raise NotImplementedError("TODO")

    def resetCell(self, cell: str):
        raise NotImplementedError("TODO")

    def getValue(self, formula: str) -> int:
        raise NotImplementedError("TODO")
