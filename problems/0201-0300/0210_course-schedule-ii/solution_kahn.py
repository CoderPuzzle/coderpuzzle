from typing import List


class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        from collections import deque

        # A valid order is exactly a topological ordering of the graph where
        # each pair [course, prereq] is the edge prereq -> course.
        adjacency = [[] for _ in range(numCourses)]
        indegree = [0] * numCourses
        for course, prereq in prerequisites:
            adjacency[prereq].append(course)
            indegree[course] += 1
        # Kahn's algorithm: start from every course with no prerequisites.
        queue = deque(i for i in range(numCourses) if indegree[i] == 0)
        order = []
        while queue:
            node = queue.popleft()
            order.append(node)
            # Emitting a course consumes its edges: dependents lose one
            # prerequisite, and any that reaches zero becomes available.
            for nxt in adjacency[node]:
                indegree[nxt] -= 1
                if indegree[nxt] == 0:
                    queue.append(nxt)
        # A shortfall means a cycle kept positive indegrees forever; the
        # problem requires an empty list rather than a partial order.
        return order if len(order) == numCourses else []
