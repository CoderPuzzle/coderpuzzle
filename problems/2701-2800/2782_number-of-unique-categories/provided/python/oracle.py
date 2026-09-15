"""Problem-provided oracle (CategoryHandler). Assembled into every
submission by the judge; never editable in the editor. This file is the
hidden implementation — solvers see only the public API documented in
the starter."""


class CategoryHandler:
    """Oracle for 2782 number-of-unique-categories: n elements with a
    fixed category each; the assignment array is hidden and only
    haveSameCategory reveals it. Every query spends budget."""

    def __init__(self, category: list[int], budget: int):
        self.category = list(category)
        self.budget = budget

    def haveSameCategory(self, a: int, b: int) -> bool:  # noqa: N802 — LeetCode API
        if self.budget <= 0:
            raise RuntimeError("CategoryHandler query budget exhausted")
        self.budget -= 1
        if not (0 <= a < len(self.category)) or not (0 <= b < len(self.category)):
            return False
        return self.category[a] == self.category[b]
