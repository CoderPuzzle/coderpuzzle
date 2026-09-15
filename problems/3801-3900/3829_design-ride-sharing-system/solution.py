from collections import deque
from typing import List, Optional


class RideSharingSystem:
    """Two FIFO deques plus a waiting set: riders and drivers queue in
    arrival order, matchDriverWithRider pairs the two fronts, and
    cancelRider only unmarks the rider — a later match lazily skips any
    front rider that is no longer waiting, so cancellation never shifts
    the queue.
    """

    def __init__(self):
        self.riders = deque()
        self.drivers = deque()
        self.waiting = set()

    def addRider(self, riderId: int):
        self.riders.append(riderId)
        self.waiting.add(riderId)

    def addDriver(self, driverId: int):
        self.drivers.append(driverId)

    def matchDriverWithRider(self) -> List[int]:
        while self.riders and self.riders[0] not in self.waiting:
            self.riders.popleft()
        if not self.riders or not self.drivers:
            return [-1, -1]
        riderId = self.riders.popleft()
        self.waiting.discard(riderId)
        return [self.drivers.popleft(), riderId]

    def cancelRider(self, riderId: int):
        self.waiting.discard(riderId)
