class CustomStack:
    def __init__(self, maxSize: int) -> None:
        self.values: list[int] = []
        # pending[i]: increment owed by every element at depth <= i,
        # applied lazily when that element is popped
        self.pending: list[int] = []
        self.max_size = maxSize

    def push(self, x: int) -> None:
        if len(self.values) < self.max_size:
            self.values.append(x)
            self.pending.append(0)

    def pop(self) -> int:
        if not self.values:
            return -1
        increment = self.pending.pop()
        # increments always target a prefix, so the popped element absorbed
        # everything its depth owes — pass that down to the new deepest slot
        if self.pending:
            self.pending[-1] += increment
        return self.values.pop() + increment

    def increment(self, k: int, val: int) -> None:
        # one write at the deepest slot the increment reaches; no O(k) walk
        limit = min(k, len(self.values))
        if limit:
            self.pending[limit - 1] += val
