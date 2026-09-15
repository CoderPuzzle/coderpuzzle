"""The hidden big array (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by
the judge, never editable in the editor: `at(index)` returns the value at
a 64-bit position and `size()` reports the 64-bit array length. The test
case describes nums by its maximal blocks — each a [value, count] pair —
and this oracle replays that description without ever materializing the
array. Solvers see only the public API documented in the starter.
"""

from bisect import bisect_right


class BigArray:
    def __init__(self, blocks: list, budget: int):
        self.values = []
        self.starts = []
        offset = 0
        previous = None
        for value, count in blocks:
            value, count = int(value), int(count)
            if value == previous:
                raise ValueError("BigArray blocks must alternate values")
            self.values.append(value)
            self.starts.append(offset)
            offset += count
            previous = value
        self.total = offset
        self.budget = budget

    def at(self, index: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("BigArray query budget exhausted")
        self.budget -= 1
        run = bisect_right(self.starts, index) - 1
        return self.values[run]

    def size(self) -> int:
        return self.total
