import threading
from collections import deque


class BoundedBlockingQueue:
    # One lock guards the deque; the two condition variables let a thread
    # release that lock while it waits for the queue to become non-full
    # (producers) or non-empty (consumers), and be woken by the other side.
    def __init__(self, capacity: int) -> None:
        self.capacity = capacity
        self.items = deque()
        self.lock = threading.Lock()
        self.not_full = threading.Condition(self.lock)
        self.not_empty = threading.Condition(self.lock)

    def enqueue(self, element: int) -> None:
        with self.lock:
            while len(self.items) == self.capacity:
                self.not_full.wait()
            self.items.append(element)
            self.not_empty.notify()

    def dequeue(self) -> int:
        with self.lock:
            while not self.items:
                self.not_empty.wait()
            element = self.items.popleft()
            self.not_full.notify()
            return element

    def size(self) -> int:
        with self.lock:
            return len(self.items)
