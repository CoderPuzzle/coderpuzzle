from typing import List


class Solution:
    def finishTime(self, n: int, edges: List[List[int]], baseTime: List[int]) -> int:
        # Rerooting DP. down[v] finishes v's side with the parent direction
        # excluded; up[v] carries the mirrored value arriving from the parent
        # side. Combining both directions at every node plays it as the root,
        # so one forward sweep evaluates every choice of root.
        adjacency = [[] for _ in range(n)]
        for u, v in edges:
            adjacency[u].append(v)
            adjacency[v].append(u)

        parent = [-1] * n
        parent[0] = -2
        order = [0]
        head = 0
        while head < len(order):
            node = order[head]
            head += 1
            for nxt in adjacency[node]:
                if parent[nxt] == -1:
                    parent[nxt] = node
                    order.append(nxt)

        down = [0] * n
        for v in reversed(order):
            low = high = None  # smallest / largest finish among the children
            for w in adjacency[v]:
                if w != parent[v]:
                    value = down[w]
                    if low is None or value < low:
                        low = value
                    if high is None or value > high:
                        high = value
            # A leaf role stops at the task's own duration.
            down[v] = baseTime[v] if low is None else high + (high - low) + baseTime[v]

        infinity = float("inf")
        up = [0] * n
        best = None
        for v in order:
            incoming = []  # values flowing into v from every incident direction
            slots = {}  # child -> slot of its down[] entry inside incoming
            for w in adjacency[v]:
                if w != parent[v]:
                    slots[w] = len(incoming)
                    incoming.append(down[w])
            if v != 0:
                incoming.append(up[v])
            if not incoming:
                # n == 1: the lone task is its own root.
                return baseTime[v]
            # Two smallest / two largest entries, positions kept apart so one
            # branch can be excluded without losing a duplicated extreme.
            low1 = low2 = infinity
            high1 = high2 = -infinity
            low_slot = high_slot = -1
            for i, value in enumerate(incoming):
                if value < low1:
                    low1, low2, low_slot = value, low1, i
                elif value < low2:
                    low2 = value
                if value > high1:
                    high1, high2, high_slot = value, high1, i
                elif value > high2:
                    high2 = value
            candidate = high1 + (high1 - low1) + baseTime[v]
            if best is None or candidate < best:
                best = candidate
            for child, slot in slots.items():
                rest_low = low2 if slot == low_slot else low1
                rest_high = high2 if slot == high_slot else high1
                if len(incoming) == 1:
                    # Without this branch the neighbour plays a leaf role.
                    up[child] = baseTime[v]
                else:
                    up[child] = rest_high + (rest_high - rest_low) + baseTime[v]
        return best
