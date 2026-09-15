from typing import List, Optional


class Solution:
    def findMaximumElegance(self, items: List[List[int]], k: int) -> int:
        items = sorted(items, reverse=True)
        total = sum(p for p, _ in items[:k])
        counts = {}
        for _, c in items[:k]:
            counts[c] = counts.get(c, 0) + 1
        distinct = len(counts)
        ans = total + distinct * distinct

        # min-heap of (profit, category) for duplicated categories among top-k;
        # the heap is never pushed to after construction, so a sorted list with
        # a moving pointer reproduces heapq's pop order exactly.
        heap = sorted((p, c) for p, c in items[:k] if counts[c] > 1)
        h = 0

        for p, c in items[k:]:
            if c in counts:
                continue
            while h < len(heap) and counts[heap[h][1]] <= 1:
                h += 1
            if h >= len(heap):
                break
            min_p, min_c = heap[h]
            h += 1
            total = total - min_p + p
            counts[min_c] -= 1
            counts[c] = 1
            distinct += 1
            ans = max(ans, total + distinct * distinct)
        return ans
