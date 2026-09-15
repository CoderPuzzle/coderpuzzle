import heapq
from typing import List, Optional


class AuctionSystem:
    """Per item, a lazy-deletion max-heap of (-amount, -userId, seq)
    entries: the top is the live leader once every stale top has been
    popped. A seq map names the newest entry per (userId, itemId) pair,
    so addBid/updateBid just push a newer entry (the old one turns stale
    by its seq) and removeBid drops the pair. The heap orders by amount
    first, userId second, which is exactly the stated tie-break.
    """

    def __init__(self):
        self.heaps = {}
        self.latest_seq = {}
        self.clock = 0

    def addBid(self, userId: int, itemId: int, bidAmount: int):
        self._push(userId, itemId, bidAmount)

    def updateBid(self, userId: int, itemId: int, newAmount: int):
        self._push(userId, itemId, newAmount)

    def removeBid(self, userId: int, itemId: int):
        del self.latest_seq[(userId, itemId)]

    def getHighestBidder(self, itemId: int) -> int:
        heap = self.heaps.get(itemId)
        while heap:
            neg_amount, neg_user, seq = heap[0]
            if self.latest_seq.get((-neg_user, itemId)) == seq:
                return -neg_user
            heapq.heappop(heap)
        return -1

    def _push(self, userId: int, itemId: int, amount: int):
        self.clock += 1
        self.latest_seq[(userId, itemId)] = self.clock
        heap = self.heaps.setdefault(itemId, [])
        heapq.heappush(heap, (-amount, -userId, self.clock))
