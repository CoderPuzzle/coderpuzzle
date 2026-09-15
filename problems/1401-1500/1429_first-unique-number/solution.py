from collections import Counter, deque
from typing import Deque, Dict, List


class FirstUnique:
    def __init__(self, nums: List[int]):
        self.counts: Dict[int, int] = Counter()
        self.queue: Deque[int] = deque()
        for value in nums:
            self.add(value)

    def showFirstUnique(self) -> int:
        while self.queue and self.counts[self.queue[0]] > 1:
            self.queue.popleft()
        return self.queue[0] if self.queue else -1

    def add(self, value: int) -> None:
        self.counts[value] += 1
        self.queue.append(value)
