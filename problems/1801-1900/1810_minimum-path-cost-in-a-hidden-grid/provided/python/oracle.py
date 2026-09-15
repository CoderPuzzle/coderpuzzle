"""Problem-provided oracle (GridMaster). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class GridMaster:
    """Interactive oracle for hidden-grid problems (invocation type
    "interactive"). Mirrors runner/java/GridMaster.java exactly."""

    DELTAS = {"U": (-1, 0), "D": (1, 0), "L": (0, -1), "R": (0, 1)}

    def __init__(self, grid: list[list[int]], start: list[int], target: list[int], budget: int):
        self.cost = grid
        self.rows, self.cols = len(grid), len(grid[0]) if grid else 0
        self.row, self.col = start
        self.target_row, self.target_col = target
        self.budget = budget

    def _spend(self) -> None:
        if self.budget <= 0:
            raise RuntimeError("GridMaster query budget exhausted")
        self.budget -= 1

    def _enterable(self, row: int, col: int) -> bool:
        return 0 <= row < self.rows and 0 <= col < self.cols and self.cost[row][col] > 0

    def canMove(self, direction: str) -> bool:  # noqa: N802 — LeetCode API
        self._spend()
        delta_row, delta_col = self.DELTAS[direction]
        return self._enterable(self.row + delta_row, self.col + delta_col)

    def move(self, direction: str) -> int:
        self._spend()
        delta_row, delta_col = self.DELTAS[direction]
        row, col = self.row + delta_row, self.col + delta_col
        if not self._enterable(row, col):
            return -1
        self.row, self.col = row, col
        return self.cost[row][col]

    def isTarget(self) -> bool:  # noqa: N802 — LeetCode API
        self._spend()
        return (self.row, self.col) == (self.target_row, self.target_col)
