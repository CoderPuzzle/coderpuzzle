import heapq
from typing import List


class EventManager:
    # A lazy-deletion max-priority queue: every priority update pushes a
    # fresh entry, and pollHighest pops stale entries whose stored priority
    # no longer matches the live map value.
    def __init__(self, events: List[List[int]]):
        self.priority = {}
        self.heap = []
        for event_id, prio in events:
            self.priority[event_id] = prio
            heapq.heappush(self.heap, (-prio, event_id))

    def updatePriority(self, eventId: int, newPriority: int) -> None:
        self.priority[eventId] = newPriority
        heapq.heappush(self.heap, (-newPriority, eventId))

    def pollHighest(self) -> int:
        while self.heap:
            neg_prio, event_id = heapq.heappop(self.heap)
            if self.priority.get(event_id) == -neg_prio:
                del self.priority[event_id]
                return event_id
        return -1
