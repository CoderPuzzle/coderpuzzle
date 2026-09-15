from bisect import bisect_left, bisect_right
from collections import deque


class Router:
    def __init__(self, memoryLimit: int) -> None:
        self.limit = memoryLimit
        # three parallel views of the stored packets: FIFO order, duplicate
        # detection, and an append-only timestamp log per destination
        self.queue: deque[tuple[int, int, int]] = deque()
        self.stored: set[tuple[int, int, int]] = set()
        self.timestamps: dict[int, list[int]] = {}
        self.heads: dict[int, int] = {}

    def addPacket(self, source: int, destination: int, timestamp: int) -> bool:
        packet = (source, destination, timestamp)
        if packet in self.stored:
            return False
        if len(self.queue) == self.limit:
            # the oldest packet leaves all three views; its log entry is only
            # abandoned past the head, never shifted out of the list
            old_source, old_destination, old_timestamp = self.queue.popleft()
            self.stored.remove((old_source, old_destination, old_timestamp))
            self.heads[old_destination] += 1
        self.queue.append(packet)
        self.stored.add(packet)
        self.timestamps.setdefault(destination, []).append(timestamp)
        self.heads.setdefault(destination, 0)
        return True

    def forwardPacket(self) -> list[int]:
        if not self.queue:
            return []
        # forwarding hands over the oldest packet and drops it from every view
        source, destination, timestamp = self.queue.popleft()
        self.stored.remove((source, destination, timestamp))
        self.heads[destination] += 1
        return [source, destination, timestamp]

    def getCount(self, destination: int, startTime: int, endTime: int) -> int:
        times = self.timestamps.get(destination)
        if times is None:
            return 0
        # adds arrive with non-decreasing timestamps, so each log is sorted
        # for free and the live entries are the suffix [head, len)
        head = self.heads[destination]
        return bisect_right(times, endTime, head) - bisect_left(times, startTime, head)
