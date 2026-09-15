from typing import List, Optional, Tuple

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def verticalOrder(self, root: Optional[TreeNode]) -> List[List[int]]:
        # Pure collector: a root-first DFS (left before right) appends one
        # (column, row, value) record per node and defers all ordering to a
        # single sort afterwards.
        triples: List[Tuple[int, int, int]] = []

        def walk(node: Optional[TreeNode], row: int, col: int) -> None:
            if node is None:
                return
            triples.append((col, row, node.val))
            walk(node.left, row + 1, col - 1)
            walk(node.right, row + 1, col + 1)

        walk(root, 0, 0)
        # Stable sort keyed on (column, row) only: within one cell the
        # records keep their walk order, and a left-before-right walk visits
        # same-depth nodes exactly in the statement's left-to-right reading
        # order — the value must not take part.
        triples.sort(key=lambda record: (record[0], record[1]))
        answer: List[List[int]] = []
        for index, (col, _row, value) in enumerate(triples):
            if index == 0 or col != triples[index - 1][0]:
                answer.append([])
            answer[-1].append(value)
        return answer
