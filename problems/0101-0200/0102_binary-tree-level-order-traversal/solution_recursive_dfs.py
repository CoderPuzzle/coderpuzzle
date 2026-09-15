import sys

# A chain of the 2000 allowed nodes makes the recursion this deep, past
# CPython's default limit.
sys.setrecursionlimit(10_000)


class TreeNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right


class Solution:
    def levelOrder(self, root: TreeNode | None) -> list[list[int]]:
        # One list per depth, appended to the first time the walk reaches
        # that depth; afterwards it already exists for every later arrival.
        grouped: list[list[int]] = []

        def visit(node: TreeNode, depth: int) -> None:
            # Pre-order: record the value before descending, so arrivals at
            # each depth happen left to right.
            if len(grouped) == depth:
                grouped.append([])
            grouped[depth].append(node.val)
            if node.left is not None:
                visit(node.left, depth + 1)
            if node.right is not None:
                visit(node.right, depth + 1)

        if root is not None:
            visit(root, 0)
        return grouped
