# Definition for a binary tree node.
# class TreeNode:
#     def __init__(self, val=0, left=None, right=None):
#         self.val = val
#         self.left = left
#         self.right = right


class Solution:
    def amountOfTime(self, root: TreeNode | None, start: int) -> int:
        # Infection crosses one edge per minute in both directions, so
        # the answer is the maximum distance from `start` once parent
        # edges are added. BFS layers off an adjacency map measure it.
        adj: dict[int, list[int]] = {}

        def link(a: int, b: int) -> None:
            adj.setdefault(a, []).append(b)
            adj.setdefault(b, []).append(a)

        stack = [root]
        while stack:
            node = stack.pop()
            if node is None:
                continue
            if node.left is not None:
                link(node.val, node.left.val)
                stack.append(node.left)
            if node.right is not None:
                link(node.val, node.right.val)
                stack.append(node.right)

        seen = {start}
        frontier = [start]
        minutes = 0
        while frontier:
            nxt = []
            for u in frontier:
                for v in adj.get(u, ()):
                    if v not in seen:
                        seen.add(v)
                        nxt.append(v)
            if not nxt:
                break
            minutes += 1
            frontier = nxt
        return minutes
