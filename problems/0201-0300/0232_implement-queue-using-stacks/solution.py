from typing import List


class MyQueue:
    """Two stacks, transferred lazily — the in stack holds new arrivals, the
    out stack serves the front once the reversal has happened.

    `pop` and `peek` refill the out stack only when it runs dry, so each
    element crosses over at most once and every operation is amortized O(1).
    """

    def __init__(self) -> None:
        # Both piles are plain lists used strictly as stacks (append to the
        # top, pop/[-1] from the top) — the statement's sanctioned simulation.
        self.in_stack: List[int] = []  # top = newest push
        self.out_stack: List[int] = []  # top = oldest element (queue front)

    def push(self, x: int) -> None:
        self.in_stack.append(x)

    def pop(self) -> int:
        if not self.out_stack:
            self._transfer()
        return self.out_stack.pop()

    def peek(self) -> int:
        if not self.out_stack:
            self._transfer()
        return self.out_stack[-1]

    def empty(self) -> bool:
        return not self.in_stack and not self.out_stack

    def _transfer(self) -> None:
        # The reversal parks the oldest element on top of the out stack.
        while self.in_stack:
            self.out_stack.append(self.in_stack.pop())
