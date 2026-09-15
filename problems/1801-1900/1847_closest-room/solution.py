from typing import List, Optional

from bisect import bisect_left, insort


class Solution:
    def closestRoom(self, rooms: List[List[int]], queries: List[List[int]]) -> List[int]:
        # Offline trick: process queries by decreasing minSize so rooms only accumulate.
        rooms_by_size = sorted(rooms, key=lambda r: -r[1])
        query_order = sorted(range(len(queries)), key=lambda j: -queries[j][1])
        ids = []
        answers = [0] * len(queries)
        ri = 0
        for j in query_order:
            preferred, min_size = queries[j]
            # Every room with size >= minSize qualifies; once inserted it stays
            # valid for all later queries (their thresholds are only smaller).
            while ri < len(rooms_by_size) and rooms_by_size[ri][1] >= min_size:
                insort(ids, rooms_by_size[ri][0])
                ri += 1
            # Closest id sits just below or just above the insertion point.
            pos = bisect_left(ids, preferred)
            candidates = []
            if pos > 0:
                candidates.append((preferred - ids[pos - 1], ids[pos - 1]))
            if pos < len(ids):
                candidates.append((ids[pos] - preferred, ids[pos]))
            # Sorting (distance, id) pairs breaks distance ties toward the smaller id.
            if candidates:
                candidates.sort()
                # Write via the saved index so the output keeps the input order.
                answers[j] = candidates[0][1]
            else:
                answers[j] = -1  # no room met the size requirement
        return answers
