from typing import List, Optional


class LogSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def put(self, id: int, timestamp: str):
        raise NotImplementedError("TODO")

    def retrieve(self, start: str, end: str, granularity: str) -> List[int]:
        raise NotImplementedError("TODO")
