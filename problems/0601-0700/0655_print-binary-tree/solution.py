from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def printTree(self, root: Optional[TreeNode]) -> List[List[str]]:
        # The layout is pinned before any cell is written: rows = height + 1,
        # columns = 2^(height+1) - 1, children stepping 2^(height-r-1) columns
        # sideways of their parent. So a first pass measures the tree's
        # height — in edges, the unit the formulas are stated in — on an
        # explicit stack: the placement formulas consume it, so guessing it
        # wrong would shift every cell in the grid.
        height = 0
        stack = [(root, 0)]
        while stack:
            node, depth = stack.pop()
            if depth > height:
                height = depth
            for child in (node.left, node.right):
                if child is not None:
                    stack.append((child, depth + 1))
        # Second pass: the grid is born as every cell "", the root goes to
        # the exact middle of the top row, and untouched cells simply keep
        # their "" — the empties are the layout: the matrix is as wide as
        # the deepest path alone, not as the node count.
        rows, cols = height + 1, (1 << (height + 1)) - 1
        res = [[""] * cols for _ in range(rows)]
        stack = [(root, 0, (cols - 1) // 2)]
        while stack:
            node, r, c = stack.pop()
            res[r][c] = str(node.val)
            if node.left is not None or node.right is not None:
                # An internal node always sits above the last row, so the
                # exponent height - r - 1 is never negative.
                offset = 1 << (height - r - 1)
                if node.left is not None:
                    stack.append((node.left, r + 1, c - offset))
                if node.right is not None:
                    stack.append((node.right, r + 1, c + offset))
        return res
