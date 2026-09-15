from typing import Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def longestConsecutive(self, root: Optional[TreeNode]) -> int:
        # Post-order, one pass: every node reports the pair of runs that
        # top out at it — the longest whose values step +1 downward away
        # from the node (inc) and the longest stepping -1 (dec). A child
        # valued exactly node.val + 1 extends inc with its own inc, one
        # valued node.val - 1 extends dec, and any other child extends
        # nothing. A valid path is monotone, so it turns at exactly one
        # node — the topmost node of the path, one arm descending into
        # each child subtree — and its length there is inc + dec - 1;
        # the answer is the maximum of that over all nodes. The traversal
        # carries its own stack of frames: the tree may be a single
        # 3*10^4-node chain, whose pass nests 30000 calls — past
        # CPython's default recursion limit and over the 512k stacks the
        # judge hands Java and Node — so every runtime iterates instead.
        best = 0
        # Frame = [node, state, left report, right report]; state counts
        # the children still to visit: 0 = left pending, 1 = right
        # pending, 2 = ready to judge the node itself. A report is
        # (inc, dec, value) — the runs topping out at the child, plus
        # its value; None marks an absent child.
        stack = []
        if root is not None:
            stack.append([root, 0, None, None])
        while stack:
            frame = stack[-1]
            if frame[1] == 0:
                frame[1] = 1
                if frame[0].left is not None:
                    stack.append([frame[0].left, 0, None, None])
            elif frame[1] == 1:
                frame[1] = 2
                if frame[0].right is not None:
                    stack.append([frame[0].right, 0, None, None])
            else:
                stack.pop()
                value = frame[0].val
                inc = dec = 1
                for report in (frame[2], frame[3]):
                    if report is not None:
                        # The child's value picks the run it extends;
                        # its report says by how much.
                        if report[2] == value + 1 and report[0] + 1 > inc:
                            inc = report[0] + 1
                        if report[2] == value - 1 and report[1] + 1 > dec:
                            dec = report[1] + 1
                if inc + dec - 1 > best:
                    best = inc + dec - 1
                report = (inc, dec, value)
                if stack:
                    parent = stack[-1]
                    if parent[1] == 1:
                        parent[2] = report
                    else:
                        parent[3] = report
        return best
