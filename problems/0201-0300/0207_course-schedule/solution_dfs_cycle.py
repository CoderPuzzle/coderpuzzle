from typing import List, Optional


class Solution:
    def canFinish(self, numCourses: int, prerequisites: List[List[int]]) -> bool:
        # Each pair [course, prereq] is an edge prereq -> course; all courses
        # can finish exactly when this graph is acyclic.
        adjacency = [[] for _ in range(numCourses)]
        for course, prereq in prerequisites:
            adjacency[prereq].append(course)
        # Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
        # explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
        color = [0] * numCourses
        # The DFS runs on an explicit stack of (node, next-child-index) frames
        # so a long chain of prerequisites cannot overflow the call stack.
        for start in range(numCourses):
            if color[start] != 0:
                continue
            color[start] = 1
            stack = [[start, 0]]
            while stack:
                node, idx = stack[-1]
                if idx < len(adjacency[node]):
                    stack[-1][1] += 1
                    nxt = adjacency[node][idx]
                    if color[nxt] == 1:
                        return False
                    if color[nxt] == 0:
                        color[nxt] = 1
                        stack.append([nxt, 0])
                else:
                    # When a frame runs out of children its node is fully
                    # explored: color it 2 so no later sweep ever descends into
                    # it again.
                    color[node] = 2
                    stack.pop()
        return True
