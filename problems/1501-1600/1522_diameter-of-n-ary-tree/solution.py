class Solution:
    def diameter(self, root):
        if root is None:
            return 0
        # best tracks the widest bend seen anywhere: the two tallest child
        # arms through some node plus the two edges that join them.
        best = 0

        # Returns the node's height -- its longest downward arm in edges.
        def height(node):
            nonlocal best
            first, second = -1, -1
            for child in node.children:
                arm = height(child)
                if arm > first:
                    first, second = arm, first
                elif arm > second:
                    second = arm
            best = max(best, first + second + 2)
            return first + 1

        height(root)
        return best
