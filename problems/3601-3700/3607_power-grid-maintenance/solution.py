from typing import List


class Solution:
    def processQueries(self, c: int, connections: List[List[int]], queries: List[List[int]]) -> List[int]:
        # Union-Find assigns every station its fixed grid; an offline station
        # stays in its grid, so connectivity never changes.
        parent = list(range(c + 1))
        size = [1] * (c + 1)

        def find(x: int) -> int:
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x

        def union(a: int, b: int) -> None:
            ra, rb = find(a), find(b)
            if ra == rb:
                return
            if size[ra] < size[rb]:
                ra, rb = rb, ra
            parent[rb] = ra
            size[ra] += size[rb]

        for a, b in connections:
            union(a, b)

        # Group stations by component root, each group sorted ascending.
        groups = {}
        for x in range(1, c + 1):
            groups.setdefault(find(x), []).append(x)
        components = []
        comp_of = [0] * (c + 1)
        for index, members in enumerate(groups.values()):
            members.sort()
            for member in members:
                comp_of[member] = index
            components.append(members)

        online = [True] * (c + 1)
        # ptr[i] is the smallest index into components[i] that is still
        # online. Stations only go offline, so it moves monotonically
        # forward and each advance happens at most once per station.
        ptr = [0] * len(components)

        answer = []
        for q in queries:
            x = q[1]
            if q[0] == 1:
                if online[x]:
                    # An online station resolves the check by itself, even
                    # if a smaller station in the same grid is also online.
                    answer.append(x)
                else:
                    members = components[comp_of[x]]
                    p = ptr[comp_of[x]]
                    answer.append(members[p] if p < len(members) else -1)
            else:
                if online[x]:
                    online[x] = False
                    ci = comp_of[x]
                    # Only a hit on the current minimum forces the pointer on.
                    if components[ci][ptr[ci]] == x:
                        p = ptr[ci]
                        members = components[ci]
                        while p < len(members) and not online[members[p]]:
                            p += 1
                        ptr[ci] = p
        return answer
