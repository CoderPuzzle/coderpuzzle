from typing import List, Optional, Set


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def findTarget(self, root: Optional[TreeNode], k: int) -> bool:
        # A value pairs with k minus itself, so the whole question is set
        # membership: keep every value already visited in a hash set, and
        # each new node learns with one lookup whether its partner came
        # earlier. The lookup comes before the insert — the ordering that
        # forbids a node pairing with itself, so a k equal to twice a
        # value that occurs once stays false. The visiting order is
        # irrelevant: any traversal that reaches every node sees one
        # member of a summing pair before the other, so a plain preorder
        # returns true at the first hit and false only after the whole
        # tree is exhausted. The walk carries its own stack of nodes: the
        # tree may be a single 10^4-node chain, whose walk would nest
        # 10000 calls — past CPython's default recursion limit and over
        # the 512k stacks the judge hands Java and Node — so every
        # runtime iterates instead.
        seen: Set[int] = set()
        stack: List[TreeNode] = [root]
        while stack:
            node = stack.pop()
            if k - node.val in seen:
                return True
            seen.add(node.val)
            if node.left is not None:
                stack.append(node.left)
            if node.right is not None:
                stack.append(node.right)
        return False
