from typing import List, Optional


class StatisticsTracker:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addNumber(self, number: int):
        raise NotImplementedError("TODO")

    def removeFirstAddedNumber(self):
        raise NotImplementedError("TODO")

    def getMean(self) -> int:
        raise NotImplementedError("TODO")

    def getMedian(self) -> int:
        raise NotImplementedError("TODO")

    def getMode(self) -> int:
        raise NotImplementedError("TODO")
