"""Problem-provided oracle (MountainArray). Assembled into every
submission by the judge; never editable in the editor. This file
is the hidden implementation — solvers see only the public API
documented in the starter."""


class MountainArray:
    """Oracle for 1095 find-in-mountain-array: get(index) with a hard
    call budget (LeetCode allows 100)."""

    def __init__(self, mountain: list[int], budget: int):
        self.mountain = mountain
        self.budget = budget

    def get(self, index: int) -> int:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("MountainArray query budget exhausted")
        self.budget -= 1
        if not 0 <= index < len(self.mountain):
            raise IndexError("MountainArray index out of range")
        return self.mountain[index]

    def length(self) -> int:  # noqa: N802 — LeetCode API
        return len(self.mountain)
