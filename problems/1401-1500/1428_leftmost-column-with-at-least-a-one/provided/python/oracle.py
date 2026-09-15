"""Problem-provided oracle (BinaryMatrix). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class BinaryMatrix:
    """Oracle for 1428 leftmost-column-with-at-least-a-one: get(row, col)
    and dimensions(), under LeetCode's 1000-call budget."""

    def __init__(self, matrix: list[list[int]], budget: int):
        self.matrix = matrix
        self.budget = budget

    def get(self, row: int, col: int) -> int:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("BinaryMatrix query budget exhausted")
        self.budget -= 1
        return self.matrix[row][col]

    def dimensions(self) -> list[int]:  # noqa: N802 — LeetCode API
        return [len(self.matrix), len(self.matrix[0]) if self.matrix else 0]
