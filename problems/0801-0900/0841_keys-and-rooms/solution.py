from typing import List


class Solution:
    def canVisitAllRooms(self, rooms: List[List[int]]) -> bool:
        # Rooms are nodes and keys are one-way edges, so the rooms that can
        # ever be entered are exactly those reachable from room 0. An explicit
        # stack floods the key graph; the answer compares marked rooms to n.
        seen = [False] * len(rooms)
        seen[0] = True
        stack: List[int] = [0]
        visited = 1
        while stack:
            room = stack.pop()
            for key in rooms[room]:
                if seen[key]:
                    continue
                seen[key] = True
                visited += 1
                stack.append(key)
        return visited == len(rooms)
