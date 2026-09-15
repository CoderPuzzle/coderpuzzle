from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def smallestFromLeaf(self, root: Optional[TreeNode]) -> str:
        # Every root-to-leaf path, read backwards, is one candidate, and
        # the answer is the smallest of them — plain lexicographic order,
        # in which a strict prefix counts as smaller ("ab" < "aba"). One
        # shared path buffer holds a character per active root->node
        # frame: descending appends, unwinding pops, so no frame ever
        # carries a copy of its parent's path, and the buffer is reversed
        # into a candidate string only at a leaf. Python's own `<` does
        # the comparing — code point by code point, strict prefix smaller
        # — which is exactly the statement's rule.
        # Iterative on purpose: the 8500-node chain the constraints allow
        # is far deeper than CPython's default recursion limit; the
        # explicit stack is one entry per node or unwind marker and never
        # nests a call.
        best: Optional[str] = None
        path: List[str] = []  # one character per active frame, root -> node
        DESCEND, UNWIND = object(), object()  # the two stack entry kinds
        pending: List[tuple] = [(root, DESCEND)]
        while pending:
            node, kind = pending.pop()
            if kind is UNWIND:
                path.pop()
                continue
            path.append(chr(ord("a") + node.val))
            if node.left is None and node.right is None:
                candidate = "".join(reversed(path))
                if best is None or candidate < best:
                    best = candidate
                path.pop()  # a leaf unwinds its own character
                continue
            pending.append((node, UNWIND))  # unwinds once both subtrees finish
            if node.right is not None:
                pending.append((node.right, DESCEND))
            if node.left is not None:
                pending.append((node.left, DESCEND))
        return best if best is not None else ""
