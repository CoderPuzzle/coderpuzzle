from typing import List, Optional


class Robot:
    def __init__(self, width: int, height: int):
        raise NotImplementedError("TODO")

    def step(self, num: int):
        raise NotImplementedError("TODO")

    def getPos(self) -> List[int]:
        raise NotImplementedError("TODO")

    def getDir(self) -> str:
        raise NotImplementedError("TODO")
