"""Problem-provided oracle (Street). Assembled into every submission
by the judge; never editable in the editor. This file is the hidden
implementation — solvers see only the public API documented in the
starter."""


class Street:
    """Oracle for 2728 count-houses-in-a-circular-street: a circular
    street of houses whose doors are open (1) or closed (0) initially,
    with the agent standing at the first house. Every operation spends
    budget."""

    def __init__(self, doors: list[int], budget: int):
        self.doors = list(doors)
        self.budget = budget
        self.position = 0

    def openDoor(self) -> None:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Street query budget exhausted")
        self.budget -= 1
        self.doors[self.position] = 1

    def closeDoor(self) -> None:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Street query budget exhausted")
        self.budget -= 1
        self.doors[self.position] = 0

    def isDoorOpen(self) -> bool:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Street query budget exhausted")
        self.budget -= 1
        return self.doors[self.position] == 1

    def moveRight(self) -> None:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Street query budget exhausted")
        self.budget -= 1
        self.position = (self.position + 1) % len(self.doors)

    def moveLeft(self) -> None:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Street query budget exhausted")
        self.budget -= 1
        self.position = (self.position - 1) % len(self.doors)
