from typing import Optional


class Solution:
    def doubleIt(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # A position carries into the one above it exactly when its original
        # digit is five or more: doubling produces that carry by itself, and
        # an incoming carry of one never flips the outcome (2 * 4 + 1 = 9
        # stays). So one forward pass rewrites each node from its successor
        # while the successor still holds its original digit, and the
        # original head digit, remembered before any write, tells whether a
        # new leading node must be prepended.
        grows = head.val >= 5
        cur = head
        while cur is not None:
            nxt = cur.next
            inc = 1 if nxt is not None and nxt.val >= 5 else 0
            cur.val = (cur.val * 2 + inc) % 10
            cur = nxt
        if grows:
            return ListNode(1, head)
        return head
