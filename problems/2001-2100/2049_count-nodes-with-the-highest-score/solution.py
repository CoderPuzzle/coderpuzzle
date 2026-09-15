from typing import List


class Solution:
    def countHighestScoreNodes(self, parents: List[int]) -> int:
        n = len(parents)
        children = [[] for _ in range(n)]
        for node in range(1, n):
            children[parents[node]].append(node)

        order = []
        stack = [0]
        while stack:
            node = stack.pop()
            order.append(node)
            stack.extend(children[node])

        subtree = [1] * n
        highest = 0
        count = 0
        for node in reversed(order):
            size = 1
            score = 1
            for child in children[node]:
                size += subtree[child]
                score *= subtree[child]
            subtree[node] = size
            outside = n - size
            if outside:
                score *= outside
            if score > highest:
                highest = score
                count = 1
            elif score == highest:
                count += 1
        return count
