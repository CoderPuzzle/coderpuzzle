from typing import List, Optional


class AuctionSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addBid(self, userId: int, itemId: int, bidAmount: int):
        raise NotImplementedError("TODO")

    def updateBid(self, userId: int, itemId: int, newAmount: int):
        raise NotImplementedError("TODO")

    def removeBid(self, userId: int, itemId: int):
        raise NotImplementedError("TODO")

    def getHighestBidder(self, itemId: int) -> int:
        raise NotImplementedError("TODO")
