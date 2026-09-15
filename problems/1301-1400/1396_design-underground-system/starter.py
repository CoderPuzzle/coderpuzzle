from typing import List, Optional


class UndergroundSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def checkIn(self, id: int, stationName: str, t: int):
        raise NotImplementedError("TODO")

    def checkOut(self, id: int, stationName: str, t: int):
        raise NotImplementedError("TODO")

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        raise NotImplementedError("TODO")
