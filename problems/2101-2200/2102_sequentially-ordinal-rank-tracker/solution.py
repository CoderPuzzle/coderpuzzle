import heapq


class _WorstLocation:
    def __init__(self, name: str, score: int):
        self.name = name
        self.score = score

    def __lt__(self, other: "_WorstLocation") -> bool:
        if self.score != other.score:
            return self.score < other.score
        return self.name > other.name


class SORTracker:
    def __init__(self):
        self._prefix = []
        self._remaining = []

    def add(self, name: str, score: int):
        heapq.heappush(self._prefix, _WorstLocation(name, score))
        moved = heapq.heappop(self._prefix)
        heapq.heappush(self._remaining, (-moved.score, moved.name))

    def get(self) -> str:
        negative_score, name = heapq.heappop(self._remaining)
        heapq.heappush(self._prefix, _WorstLocation(name, -negative_score))
        return self._prefix[0].name
