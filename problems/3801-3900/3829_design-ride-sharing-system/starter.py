from typing import List, Optional


class RideSharingSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def addRider(self, riderId: int):
        raise NotImplementedError("TODO")

    def addDriver(self, driverId: int):
        raise NotImplementedError("TODO")

    def matchDriverWithRider(self) -> List[int]:
        raise NotImplementedError("TODO")

    def cancelRider(self, riderId: int):
        raise NotImplementedError("TODO")
