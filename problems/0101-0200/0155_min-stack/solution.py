class MinStack:
    """Stack of (value, minimum-so-far) pairs — each entry is self-contained."""

    def __init__(self) -> None:
        self.stack: list[tuple[int, int]] = []

    def push(self, value: int) -> None:
        # Snapshot the minimum of the stack as of this push: the new value
        # combined with the minimum of the entry below.
        if self.stack:
            self.stack.append((value, min(value, self.stack[-1][1])))
        else:
            self.stack.append((value, value))

    def pop(self) -> None:
        # A pop restores an earlier stack state whose exposed entry already
        # holds that state's minimum — no recomputation needed.
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1][0]

    def getMin(self) -> int:
        # The top pair alone answers both queries in O(1).
        return self.stack[-1][1]
