import heapq


class StockPrice:
    def __init__(self) -> None:
        # timestamp -> currently valid price; a correction is an overwrite.
        self.price_at: dict[int, int] = {}
        self.latest_timestamp = 0
        # Twin lazy heaps: (price, timestamp) pairs are pushed on update and
        # never removed; stale entries are discarded only at the top.
        self.max_heap: list[tuple[int, int]] = []
        self.min_heap: list[tuple[int, int]] = []

    def update(self, timestamp: int, price: int) -> None:
        self.price_at[timestamp] = price
        if timestamp > self.latest_timestamp:
            self.latest_timestamp = timestamp
        heapq.heappush(self.max_heap, (-price, timestamp))
        heapq.heappush(self.min_heap, (price, timestamp))

    def current(self) -> int:
        return self.price_at[self.latest_timestamp]

    def maximum(self) -> int:
        # An entry is garbage exactly when its timestamp now maps to a
        # different price; pop those, then the top is the true maximum.
        while True:
            price, timestamp = self.max_heap[0]
            if self.price_at[timestamp] == -price:
                return -price
            heapq.heappop(self.max_heap)

    def minimum(self) -> int:
        # Same lazy cleanup on the min side.
        while True:
            price, timestamp = self.min_heap[0]
            if self.price_at[timestamp] == price:
                return price
            heapq.heappop(self.min_heap)
