from typing import List, Optional
import heapq


class Solution:
    def alienOrder(self, words: List[str]) -> str:
        adj = {}
        indeg = {}
        for word in words:
            for ch in word:
                adj.setdefault(ch, set())
                indeg.setdefault(ch, 0)

        for prev, nxt in zip(words, words[1:]):
            if len(prev) > len(nxt) and prev.startswith(nxt):
                return ""  # longer word before its own prefix -> invalid
            for a, b in zip(prev, nxt):
                if a != b:
                    if b not in adj[a]:
                        adj[a].add(b)
                        indeg[b] += 1
                    break

        heap = [ch for ch, d in indeg.items() if d == 0]
        heapq.heapify(heap)
        order = []
        while heap:
            ch = heapq.heappop(heap)
            order.append(ch)
            for nxt in adj[ch]:
                indeg[nxt] -= 1
                if indeg[nxt] == 0:
                    heapq.heappush(heap, nxt)

        if len(order) != len(indeg):
            return ""  # cycle -> invalid
        return "".join(order)
