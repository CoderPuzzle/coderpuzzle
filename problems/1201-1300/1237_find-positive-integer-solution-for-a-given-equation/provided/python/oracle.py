"""The hidden formula behind f(x, y) (problem-provided oracle).

Ships with the problem, assembled into every submission's namespace by the
judge, never editable in the editor. One of nine strictly increasing
formulas is selected per case by function_id; every query is counted
against the budget so an unbounded search cannot pass by luck.
"""


class CustomFunction:
    def __init__(self, function_id: int, budget: int):
        self.function_id = function_id
        self.budget = budget

    def f(self, x: int, y: int) -> int:
        if self.budget <= 0:
            raise RuntimeError("Oracle query budget exhausted")
        self.budget -= 1
        if self.function_id == 1:
            return x + y
        if self.function_id == 2:
            return x * y
        if self.function_id == 3:
            return x * x + y
        if self.function_id == 4:
            return x + y * y
        if self.function_id == 5:
            return x * x + y * y
        if self.function_id == 6:
            return 10 * x + y
        if self.function_id == 7:
            return x * x * x + y * y * y
        if self.function_id == 8:
            return (x + y) * (x + y)
        if self.function_id == 9:
            return x * y + x + y
        raise RuntimeError("Unknown function_id")
