"""Problem-provided oracle (ArrayReader). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class ArrayReader:
    """Oracle for the hidden sorted sequence of unknown length: get(k)
    returns 2^31 - 1 past the end, an unambiguous out-of-range sentinel."""

    SENTINEL = 2**31 - 1

    def __init__(self, arr: list[int], budget: int):
        self.arr = arr
        self.budget = budget

    def get(self, index: int) -> int:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("SequenceReader query budget exhausted")
        self.budget -= 1
        if 0 <= index < len(self.arr):
            return self.arr[index]
        return self.SENTINEL
