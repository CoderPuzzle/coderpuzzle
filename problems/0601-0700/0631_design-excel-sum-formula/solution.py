from typing import List, Tuple


class Excel:
    """Cell values beside per-cell formula lists, both plain grids.

    `set` writes the literal and empties the cell's formula list; `sum`
    installs the flattened reference list parsed from `numbers`; `get`
    resolves on demand, recursing through formula cells so a later `set`
    on a source cell is picked up by the next `get` of anything downstream.
    """

    def __init__(self, height: int, width: str):
        self.columns = ord(width) - ord("A") + 1
        self.values: List[List[int]] = [[0] * self.columns for _ in range(height + 1)]
        self.formulas: List[List[List[Tuple[int, int]]]] = [
            [[] for _ in range(self.columns)] for _ in range(height + 1)
        ]

    def set(self, row: int, column: str, val: int):
        col = ord(column) - ord("A")
        self.values[row][col] = val
        self.formulas[row][col] = []

    def get(self, row: int, column: str) -> int:
        return self._value(row, ord(column) - ord("A"))

    def sum(self, row: int, column: str, numbers: List[str]) -> int:
        references: List[Tuple[int, int]] = []
        for number in numbers:
            left, separator, right = number.partition(":")
            first = self._cell(left)
            if not separator:
                references.append(first)
                continue
            last = self._cell(right)
            references.extend((r, c) for r in range(first[0], last[0] + 1) for c in range(first[1], last[1] + 1))
        self.formulas[row][ord(column) - ord("A")] = references
        return self._value(row, ord(column) - ord("A"))

    def _cell(self, token: str) -> Tuple[int, int]:
        # A cell token is one column letter followed by the row number.
        return int(token[1:]), ord(token[0]) - ord("A")

    def _value(self, row: int, col: int) -> int:
        references = self.formulas[row][col]
        if not references:
            return self.values[row][col]
        # Recursing into each reference is the whole update story: no
        # propagation, no cache, the chain recomputed on every get.
        return sum(self._value(r, c) for r, c in references)
