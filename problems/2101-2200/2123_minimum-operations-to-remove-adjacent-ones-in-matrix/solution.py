from collections import deque
from typing import List


class Solution:
    def minimumOperations(self, grid: List[List[int]]) -> int:
        rows, columns = len(grid), len(grid[0])
        total = rows * columns
        adjacency = [[] for _ in range(total)]
        left_vertices = []
        for row in range(rows):
            for column in range(columns):
                if grid[row][column] == 0 or (row + column) % 2 == 1:
                    continue
                vertex = row * columns + column
                left_vertices.append(vertex)
                for dr, dc in ((-1, 0), (1, 0), (0, -1), (0, 1)):
                    nr, nc = row + dr, column + dc
                    if 0 <= nr < rows and 0 <= nc < columns and grid[nr][nc] == 1:
                        adjacency[vertex].append(nr * columns + nc)

        pair_left = [-1] * total
        pair_right = [-1] * total
        distance = [total + 1] * total
        infinity = total + 1

        def layer() -> int:
            queue = deque()
            for vertex in left_vertices:
                if pair_left[vertex] == -1:
                    distance[vertex] = 0
                    queue.append(vertex)
                else:
                    distance[vertex] = infinity
            shortest = infinity
            while queue:
                vertex = queue.popleft()
                if distance[vertex] >= shortest:
                    continue
                for neighbor in adjacency[vertex]:
                    mate = pair_right[neighbor]
                    if mate == -1:
                        shortest = distance[vertex] + 1
                    elif distance[mate] == infinity:
                        distance[mate] = distance[vertex] + 1
                        queue.append(mate)
            return shortest

        def augment(root: int, shortest: int, next_edge: List[int]) -> bool:
            stack = [root]
            path_edges = []
            while stack:
                vertex = stack[-1]
                if next_edge[vertex] == len(adjacency[vertex]):
                    distance[vertex] = infinity
                    stack.pop()
                    if path_edges:
                        path_edges.pop()
                    continue
                neighbor = adjacency[vertex][next_edge[vertex]]
                next_edge[vertex] += 1
                mate = pair_right[neighbor]
                if mate == -1:
                    if distance[vertex] + 1 != shortest:
                        continue
                    pair_left[vertex] = neighbor
                    pair_right[neighbor] = vertex
                    for level in range(len(stack) - 2, -1, -1):
                        parent = stack[level]
                        edge = path_edges[level]
                        pair_left[parent] = edge
                        pair_right[edge] = parent
                    return True
                if distance[mate] == distance[vertex] + 1:
                    path_edges.append(neighbor)
                    stack.append(mate)
            return False

        matching = 0
        while True:
            shortest = layer()
            if shortest == infinity:
                break
            next_edge = [0] * total
            for vertex in left_vertices:
                if pair_left[vertex] == -1 and augment(vertex, shortest, next_edge):
                    matching += 1
        return matching
