from typing import List
import heapq


class FileSharing:
    def __init__(self, m: int):
        self.chunks: dict = {}
        self.alive: set = set()
        self.freed: list = []
        self.next_id = 1

    def join(self, ownedChunks: List[int]) -> int:
        if self.freed:
            uid = heapq.heappop(self.freed)
        else:
            uid = self.next_id
            self.next_id += 1
        self.chunks[uid] = set(ownedChunks)
        self.alive.add(uid)
        return uid

    def leave(self, userID: int) -> None:
        self.chunks.pop(userID, None)
        self.alive.discard(userID)
        heapq.heappush(self.freed, userID)

    def request(self, userID: int, chunkID: int) -> List[int]:
        owners = sorted(uid for uid in self.alive if chunkID in self.chunks[uid])
        if owners:
            self.chunks[userID].add(chunkID)
        return owners
