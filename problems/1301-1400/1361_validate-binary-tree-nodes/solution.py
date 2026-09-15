from collections import deque
from typing import List


class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: List[int], rightChild: List[int]) -> bool:
        # At most one parent each, exactly one root, and full reachability
        # from that root: together necessary and sufficient.
        indegree = [0] * n
        for children in (leftChild, rightChild):
            for child in children:
                if child != -1:
                    indegree[child] += 1
        if any(count > 1 for count in indegree):
            return False
        roots = [i for i, count in enumerate(indegree) if count == 0]
        if len(roots) != 1:
            return False
        seen = {roots[0]}
        queue = deque([roots[0]])
        while queue:
            node = queue.popleft()
            for child in (leftChild[node], rightChild[node]):
                if child != -1 and child not in seen:
                    seen.add(child)
                    queue.append(child)
        return len(seen) == n
