import heapq


class SeatManager:
    def __init__(self, n: int) -> None:
        # Seats are handed out in increasing order until something is returned,
        # so a counter of the largest seat ever reserved covers the fresh seats.
        self.next_seat = 1
        # Min-heap holding ONLY currently returned seats — never the untouched ones.
        self.returned: list[int] = []

    def reserve(self) -> int:
        # Prefer the smallest returned seat; the top is always < next_seat, so the
        # two sources of free seats never overlap.
        if self.returned and self.returned[0] < self.next_seat:
            return heapq.heappop(self.returned)
        # No outstanding returns: the next fresh seat is simply next_seat.
        self.next_seat += 1
        return self.next_seat - 1

    def unreserve(self, seatNumber: int) -> None:
        # The monotone counter march is disrupted by exactly this one seat.
        heapq.heappush(self.returned, seatNumber)
