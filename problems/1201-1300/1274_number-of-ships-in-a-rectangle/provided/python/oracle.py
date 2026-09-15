"""Problem-provided oracle (Sea). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class Sea:
    """Oracle for 1274 number-of-ships-in-a-rectangle: hasShips(topRight,
    bottomLeft) answers whether the closed rectangle holds at least one
    ship, under LeetCode's 400-call budget."""

    def __init__(self, ships: list[list[int]], budget: int):
        self.ships = [tuple(ship) for ship in ships]
        self.budget = budget

    def hasShips(self, topRight: list[int], bottomLeft: list[int]) -> bool:  # noqa: N802,N803 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("Sea query budget exhausted")
        self.budget -= 1
        right, top = topRight
        left, bottom = bottomLeft
        return any(
            left <= x <= right and bottom <= y <= top for x, y in self.ships
        )
