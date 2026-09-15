from collections import deque
from typing import List


class Solution:
    def checkIfPrerequisite(
        self, numCourses: int, prerequisites: List[List[int]], queries: List[List[int]]
    ) -> List[bool]:
        adjacency = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for a, b in prerequisites:
            adjacency[a].append(b)
            indegree[b] += 1
        reach = [0] * numCourses  # bitset of courses that reach this course
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        while queue:
            u = queue.popleft()
            bits = reach[u] | (1 << u)
            for v in adjacency[u]:
                reach[v] |= bits
                indegree[v] -= 1
                if indegree[v] == 0:
                    queue.append(v)
        return [bool((reach[v] >> u) & 1) for u, v in queries]
