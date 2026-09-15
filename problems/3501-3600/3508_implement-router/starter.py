from typing import List, Optional


class Router:
    def __init__(self, memoryLimit: int):
        raise NotImplementedError("TODO")

    def addPacket(self, source: int, destination: int, timestamp: int) -> bool:
        raise NotImplementedError("TODO")

    def forwardPacket(self) -> List[int]:
        raise NotImplementedError("TODO")

    def getCount(self, destination: int, startTime: int, endTime: int) -> int:
        raise NotImplementedError("TODO")
