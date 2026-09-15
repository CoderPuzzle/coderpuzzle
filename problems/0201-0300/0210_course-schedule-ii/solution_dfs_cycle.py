from typing import List


class Solution:
    def findOrder(self, numCourses: int, prerequisites: List[List[int]]) -> List[int]:
        # A valid order is exactly a topological ordering of the graph where
        # each pair [course, prereq] is the edge prereq -> course.
        adjacency = [[] for _ in range(numCourses)]
        for course, prereq in prerequisites:
            adjacency[prereq].append(course)
        # Three-color DFS: 0 = unvisited, 1 = on the current DFS path, 2 = fully
        # explored. Meeting a neighbor colored 1 is a back edge, i.e. a cycle.
        color = [0] * numCourses
        # The DFS runs on an explicit stack of (node, next-child-index) frames
        # so a long chain of prerequisites cannot overflow the call stack.
        order = []
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
                        return []
                    if color[nxt] == 0:
                        color[nxt] = 1
                        stack.append([nxt, 0])
                else:
                    # When a frame runs out of children its node is fully
                    # explored: color it 2 and append it after every course
                    # that depends on it.
                    color[node] = 2
                    order.append(node)
                    stack.pop()
        # Reversing the postorder puts every prerequisite before the courses
        # that depend on it; a back edge short-circuits with an empty list.
        order.reverse()
        return order
