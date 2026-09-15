from typing import List, Optional


class FileSharing:
    def __init__(self, m: int):
        raise NotImplementedError("TODO")

    def join(self, ownedChunks: List[int]) -> int:
        raise NotImplementedError("TODO")

    def leave(self, userID: int):
        raise NotImplementedError("TODO")

    def request(self, userID: int, chunkID: int) -> List[int]:
        raise NotImplementedError("TODO")
