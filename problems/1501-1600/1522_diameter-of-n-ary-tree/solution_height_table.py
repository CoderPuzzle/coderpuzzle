class Solution:
    def diameter(self, root):
        if root is None:
            return 0

        # Pass one: every node's height -- its longest downward arm in
        # edges -- materialized into a table keyed by the node.
        height = {}

        def measure(node):
            tallest = -1
            for child in node.children:
                tallest = max(tallest, measure(child))
            height[id(node)] = tallest + 1
            return tallest + 1

        measure(root)

        # Pass two: the widest bend at each node pairs its two tallest
        # child arms; absent arms read -1, so a leaf scores 0.
        best = 0
        stack = [root]
        while stack:
            node = stack.pop()
            first, second = -1, -1
            for child in node.children:
                stack.append(child)
                arm = height[id(child)]
                if arm > first:
                    first, second = arm, first
                elif arm > second:
                    second = arm
            best = max(best, first + second + 2)
        return best
