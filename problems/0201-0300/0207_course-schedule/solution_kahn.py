from typing import List, Optional


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        from collections import deque

        # Each pair [course, prereq] is an edge prereq -> course; all courses
        # can finish exactly when this graph is acyclic.
        adjacency = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prereq in prerequisites:
            adjacency[prereq].append(course)
            indegree[course] += 1
        # Kahn's algorithm: seed with every course that has no prerequisites.
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        taken = 0
        while queue:
            node = queue.popleft()
            taken += 1
            # Taking a course removes its outgoing edges.
            for nxt in adjacency[node]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        # Courses inside a cycle never reach indegree zero, so a shortfall
        # means a cycle trapped the remainder.
        return taken == numCourses
