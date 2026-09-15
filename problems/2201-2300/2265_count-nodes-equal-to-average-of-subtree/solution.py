# Definition for a binary tree node is provided by the judge.
class Solution:
    def averageOfSubtree(self, root: Optional[TreeNode]) -> int:
        count = 0
        # Iterative post-order via (node, visited) frames; returns (sum, size).
        stack = [(root, False)]
        sums = {}
        sizes = {}
        while stack:
            node, visited = stack.pop()
            if node is None:
                continue
            if visited:
                s = node.val
                n = 1
                for child in (node.left, node.right):
                    if child is not None:
                        s += sums[id(child)]
                        n += sizes[id(child)]
                sums[id(node)] = s
                sizes[id(node)] = n
                if s // n == node.val:
                    count += 1
            else:
                stack.append((node, True))
                stack.append((node.left, False))
                stack.append((node.right, False))
        return count
