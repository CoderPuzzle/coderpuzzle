from bisect import bisect_right
from typing import Dict, List, Tuple


class SnapshotArray:
    """Per-index history of (snap_id, val); snapshots are virtual counters.

    A get binary-searches the rightmost entry at or before the queried
    snapshot, so history length tracks writes, not snapshot count.
    """

    def __init__(self, length: int) -> None:
        self.current = 0  # snapshot id the next snap() will return
        self.history: Dict[int, List[Tuple[int, int]]] = {}

    def set(self, index: int, val: int) -> None:
        entries = self.history.setdefault(index, [])
        if entries and entries[-1][0] == self.current:
            entries[-1] = (self.current, val)
        else:
            entries.append((self.current, val))

    def snap(self) -> int:
        self.current += 1
        return self.current - 1

    def get(self, index: int, snap_id: int) -> int:
        entries = self.history.get(index)
        if not entries:
            return 0
        position = bisect_right(entries, (snap_id, float("inf")))
        if position == 0:
            return 0
        return entries[position - 1][1]
