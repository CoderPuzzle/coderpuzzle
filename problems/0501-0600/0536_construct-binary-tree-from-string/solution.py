from typing import Optional

# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def str2tree(self, s: str) -> Optional[TreeNode]:
        # The parens spell a preorder walk: every integer opens a node, and
        # every parenthesized group is one whole subtree written right after
        # the node that owns it. The stack holds the ancestors still open
        # for children, so one left-to-right scan decides each node in the
        # very order its pieces appear.
        stack = []
        i = 0
        n = len(s)
        while i < n:
            ch = s[i]
            if ch == "(":
                i += 1
            elif ch == ")":
                # A group just closed: the subtree on top is finished and
                # belongs to the node underneath — in the left slot if that
                # is still open, otherwise the right.
                child = stack.pop()
                if stack:
                    parent = stack[-1]
                    if parent.left is None:
                        parent.left = child
                    else:
                        parent.right = child
                i += 1
            else:
                # Anything else starts a value: a run of digits with an
                # optional leading '-', up to the next parenthesis.
                j = i
                while j < n and s[j] != "(" and s[j] != ")":
                    j += 1
                stack.append(TreeNode(int(s[i:j])))
                i = j
        # Every node but the root is closed by its group's ')', so exactly
        # the root remains — or nothing, for the empty string.
        return stack[0] if stack else None
