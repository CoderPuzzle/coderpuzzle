import heapq


class NumberContainers:
    def __init__(self) -> None:
        # index -> number currently filling it
        self.slots: dict[int, int] = {}
        # number -> every index ever filled with it; stale entries are
        # discarded only when find() reaches them
        self.candidates: dict[int, list[int]] = {}

    def change(self, index: int, number: int) -> None:
        if self.slots.get(index) == number:
            return
        self.slots[index] = number
        heapq.heappush(self.candidates.setdefault(number, []), index)

    def find(self, number: int) -> int:
        heap = self.candidates.get(number)
        if heap is None:
            return -1
        # the top is the answer unless that index has since been refilled
        while heap and self.slots.get(heap[0]) != number:
            heapq.heappop(heap)
        return heap[0] if heap else -1
