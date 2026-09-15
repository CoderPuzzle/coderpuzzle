from typing import List, Optional


class HitCounter:
    def __init__(self):
        raise NotImplementedError("TODO")

    def hit(self, timestamp: int):
        raise NotImplementedError("TODO")

    def getHits(self, timestamp: int) -> int:
        raise NotImplementedError("TODO")
