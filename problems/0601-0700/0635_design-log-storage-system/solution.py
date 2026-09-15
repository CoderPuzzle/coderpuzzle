from typing import List, Tuple


class LogSystem:
    """Stored (id, timestamp) pairs in the order `put` delivered them.

    `retrieve` truncates every string — each log's timestamp and both
    bounds — to the granularity's fixed-width prefix and keeps the logs
    whose truncated timestamp compares between the truncated bounds: with
    every field zero-padded to a fixed width, that lexicographic
    comparison agrees with the field-by-field one.
    """

    def __init__(self) -> None:
        self.logs: List[Tuple[int, str]] = []

    def put(self, id: int, timestamp: str) -> None:
        self.logs.append((id, timestamp))

    def retrieve(self, start: str, end: str, granularity: str) -> List[int]:
        # Prefix length per granularity: "2017" for Year, one more ":XX"
        # field per step down to the full 19 characters.
        widths = {"Year": 4, "Month": 7, "Day": 10, "Hour": 13, "Minute": 16, "Second": 19}
        width = widths[granularity]
        low = start[:width]
        high = end[:width]
        # The scan walks the store oldest-first, so the ids come back in
        # the order their logs were stored.
        return [id for id, timestamp in self.logs if low <= timestamp[:width] <= high]
