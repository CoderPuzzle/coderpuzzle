import heapq
from collections import Counter, deque


class Solution:
    def leastInterval(self, tasks: list[str], n: int) -> int:
        counts = Counter(tasks)
        # Max-heap (negated counts, since heapq is a min-heap) of every label
        # free to run right now; only the counts matter, because the cooldown
        # rule treats every label alike.
        ready = [-c for c in counts.values()]
        heapq.heapify(ready)
        # FIFO of runs still cooling: (slot when the label may run again,
        # negated count left). Free slots arrive in order, so the front pops.
        cooling = deque()
        time = 0
        while ready or cooling:
            # Release everything whose cooldown has expired by now.
            while cooling and cooling[0][0] <= time:
                heapq.heappush(ready, cooling.popleft()[1])
            if not ready:
                # Nothing can run: jump the clock straight to the next
                # release instead of counting idle slots one by one.
                time = cooling[0][0]
                continue
            # Run one job of the largest remaining count.
            top = -heapq.heappop(ready)
            if top > 1:
                cooling.append((time + n + 1, -(top - 1)))
            time += 1
        return time
