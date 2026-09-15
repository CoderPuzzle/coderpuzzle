from typing import List, Optional


class Solution:
    def numberOfComponents(self, properties: List[List[int]], k: int) -> int:
        # intersect() counts DISTINCT shared integers, so each row first
        # collapses to a set: [1, 1] and [1, 1] share only the value 1.
        # Pairwise set intersections then spell out the edges, and an
        # iterative stack DFS counts the components.
        sets = [set(row) for row in properties]
        n = len(properties)
        adjacency = [[] for _ in range(n)]
        for i in range(n):
            for j in range(i + 1, n):
                if len(sets[i] & sets[j]) >= k:
                    adjacency[i].append(j)
                    adjacency[j].append(i)
        seen = [False] * n
        components = 0
        for start in range(n):
            if seen[start]:
                continue
            components += 1
            # Mark on push so a node never enters the stack twice.
            seen[start] = True
            stack = [start]
            while stack:
                for neighbor in adjacency[stack.pop()]:
                    if not seen[neighbor]:
                        seen[neighbor] = True
                        stack.append(neighbor)
        return components
