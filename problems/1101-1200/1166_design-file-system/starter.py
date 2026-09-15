from typing import List, Optional


class FileSystem:
    def __init__(self):
        raise NotImplementedError("TODO")

    def createPath(self, path: str, value: int) -> bool:
        raise NotImplementedError("TODO")

    def get(self, path: str) -> int:
        raise NotImplementedError("TODO")
