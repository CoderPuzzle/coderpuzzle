from collections import deque
from typing import Deque


class MyStack:
    """One queue, rotated on push — the front always holds the stack top.

    `push` appends `x`, then cycles the older elements behind it, so every
    later operation is a plain dequeue or front peek.
    """

    def __init__(self) -> None:
        self.queue: Deque[int] = deque()

    def push(self, x: int) -> None:
        self.queue.append(x)
        # Requeue everything that was below x, so x reaches the front.
        for _ in range(len(self.queue) - 1):
            self.queue.append(self.queue.popleft())

    def pop(self) -> int:
        return self.queue.popleft()

    def top(self) -> int:
        return self.queue[0]

    def empty(self) -> bool:
        return not self.queue
