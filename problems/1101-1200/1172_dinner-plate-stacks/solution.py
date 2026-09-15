import heapq


class DinnerPlates:
    """Array of stack rows plus a min-heap of indices that may have room."""

    def __init__(self, capacity: int):
        self.capacity = capacity
        self.stacks: list[list[int]] = []
        self.vacant: list[int] = []

    def push(self, val: int) -> None:
        # Discard stale entries: indices past the trimmed end, and stacks
        # already filled to capacity.
        while self.vacant and (self.vacant[0] >= len(self.stacks) or len(self.stacks[self.vacant[0]]) == self.capacity):
            heapq.heappop(self.vacant)
        if self.vacant:
            idx = heapq.heappop(self.vacant)
            self.stacks[idx].append(val)
            # Keep the index available while the stack still has room.
            if len(self.stacks[idx]) < self.capacity:
                heapq.heappush(self.vacant, idx)
        elif self.stacks and len(self.stacks[-1]) < self.capacity:
            # No recorded hole left of the tail: tail is leftmost vacant.
            self.stacks[-1].append(val)
        else:
            self.stacks.append([val])

    def pop(self) -> int:
        # Trailing empty rows are not real stacks for pop's purposes.
        while self.stacks and not self.stacks[-1]:
            self.stacks.pop()
        if not self.stacks:
            return -1
        return self.stacks[-1].pop()

    def popAtStack(self, index: int) -> int:
        if index >= len(self.stacks) or not self.stacks[index]:
            return -1
        value = self.stacks[index].pop()
        # Lazy duplicate entries are fine: staleness is re-checked on push.
        heapq.heappush(self.vacant, index)
        return value
