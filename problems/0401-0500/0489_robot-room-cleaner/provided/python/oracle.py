"""Problem-provided oracle (Robot). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class Robot:
    """Oracle for 489 robot-room-cleaner: the solution drives a blind
    robot over a hidden room. Verdict = the exact set of cleaned cells,
    so any complete spiral/backtracking strategy compares equal."""

    DIRECTIONS = [(-1, 0), (0, 1), (1, 0), (0, -1)]  # up, right, down, left

    def __init__(self, room: list[list[int]], start: list[int], budget: int):
        self.room = room
        self.rows, self.cols = len(room), len(room[0]) if room else 0
        self.row, self.col = start
        self.face = 0  # starts facing up, LeetCode convention
        self.cleaned: set[tuple[int, int]] = set()
        self.budget = budget
        self.clean()

    def _spend(self) -> None:
        if self.budget <= 0:
            raise RuntimeError("Robot operation budget exhausted")
        self.budget -= 1

    def move(self) -> bool:  # noqa: N802 — LeetCode API
        self._spend()
        dr, dc = self.DIRECTIONS[self.face]
        nr, nc = self.row + dr, self.col + dc
        if not (0 <= nr < self.rows and 0 <= nc < self.cols) or self.room[nr][nc] == 0:
            return False  # wall or obstacle: stays in place
        self.row, self.col = nr, nc
        return True

    def turnLeft(self) -> None:  # noqa: N802 — LeetCode API
        self._spend()
        self.face = (self.face - 1) % 4

    def turnRight(self) -> None:  # noqa: N802 — LeetCode API
        self._spend()
        self.face = (self.face + 1) % 4

    def clean(self) -> None:  # noqa: N802 — LeetCode API
        self._spend()
        self.cleaned.add((self.row, self.col))

    def verdict(self) -> Any:
        return sorted(list(cell) for cell in self.cleaned)
