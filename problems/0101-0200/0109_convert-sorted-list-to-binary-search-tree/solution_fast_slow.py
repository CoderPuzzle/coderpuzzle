from typing import List, Optional


class Solution:
    def sortedListToBST(self, head: Optional[ListNode]) -> Optional[TreeNode]:
        def build(node: Optional[ListNode]) -> Optional[TreeNode]:
            if node is None:
                return None
            # A one-node segment is a leaf. Doing this before the pointer walk
            # also keeps the cut below safe: with a single node `prev` would
            # still be None when it happens.
            if node.next is None:
                return TreeNode(node.val)
            # Slow/fast midpoint: slow steps one node, fast two, so when fast
            # runs past the end slow has stopped on the midpoint. The guard
            # leaves slow on the SECOND of two middles for even lengths,
            # matching the required tie-break.
            prev, slow, fast = None, node, node
            while fast is not None and fast.next is not None:
                prev = slow
                slow = slow.next
                fast = fast.next.next
            # prev trails slow, so this cut splits the segment in two; the
            # recursion then treats `node` and `slow.next` as independent heads.
            prev.next = None
            # The middle element is the only root making both sides BSTs of
            # near-equal size; nodes before it form the left subtree, after it
            # the right, so the result stays height-balanced.
            root = TreeNode(slow.val)
            root.left = build(node)
            root.right = build(slow.next)
            return root

        return build(head)
