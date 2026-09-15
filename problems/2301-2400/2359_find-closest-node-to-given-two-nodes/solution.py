from typing import List


class Solution:
    def closestMeetingNode(self, edges: List[int], node1: int, node2: int) -> int:
        def distances(start: int) -> List[int]:
            # One outgoing edge per node means the walk is forced; a node
            # already seen marks the cycle, so stop there.
            distance = [-1] * len(edges)
            current, steps = start, 0
            while current != -1 and distance[current] == -1:
                distance[current] = steps
                current = edges[current]
                steps += 1
            return distance

        from1 = distances(node1)
        from2 = distances(node2)
        best_node, best_max = -1, -1
        for node in range(len(edges)):  # ascending index: ties keep the smaller
            if from1[node] == -1 or from2[node] == -1:
                continue
            reach_max = max(from1[node], from2[node])
            if best_node == -1 or reach_max < best_max:
                best_node, best_max = node, reach_max
        return best_node
