from typing import Dict, List, Optional, Tuple


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        # One (column, row, value) record per node, gathered by an
        # explicit-stack DFS — no recursion, so a 1000-node chain cannot
        # exhaust any call stack.
        cells: Dict[int, List[Tuple[int, int]]] = {}
        pending: List[Tuple[Optional[TreeNode], int, int]] = [(root, 0, 0)]
        while pending:
            node, row, col = pending.pop()
            if node is None:
                continue
            cells.setdefault(col, []).append((row, node.val))
            pending.append((node.right, row + 1, col + 1))
            pending.append((node.left, row + 1, col - 1))
        # Per column, rows read top to bottom and values break the ties of
        # nodes sharing one cell; the column keys run left to right.
        answer: List[List[int]] = []
        for col in sorted(cells):
            answer.append([value for _, value in sorted(cells[col])])
        return answer
