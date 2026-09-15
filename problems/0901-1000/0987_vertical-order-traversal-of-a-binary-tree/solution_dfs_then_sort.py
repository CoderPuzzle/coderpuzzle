from typing import List, Optional, Tuple


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def verticalTraversal(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Pure collector: a root-first DFS (left before right, explicit
        # stack, no recursion) appends one (column, row, value) record per
        # node and keeps no answer structure at all.
        triples: List[Tuple[int, int, int]] = []
        pending: List[Tuple[Optional[TreeNode], int, int]] = [(root, 0, 0)]
        while pending:
            node, row, col = pending.pop()
            if node is None:
                continue
            triples.append((col, row, node.val))
            pending.append((node.right, row + 1, col + 1))
            pending.append((node.left, row + 1, col - 1))
        # One sort settles every ordering at once: columns left to right,
        # rows top to bottom, and values breaking the ties of nodes that
        # share one cell. The answer is then just runs of equal columns.
        triples.sort()
        answer: List[List[int]] = []
        for index, (col, _row, value) in enumerate(triples):
            if index == 0 or col != triples[index - 1][0]:
                answer.append([])
            answer[-1].append(value)
        return answer
