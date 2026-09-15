from typing import List, Optional


class Solution:
    def reverseList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # prev heads the already-reversed chain; current is the node being
        # processed. Invariant: behind prev everything is reversed, ahead of
        # current nothing has been touched.
        prev = None
        current = head
        while current:
            # Save the forward link before the flip destroys it.
            nxt = current.next
            current.next = prev
            prev = current
            current = nxt
        # current is exhausted: prev points at the original tail, the new head.
        return prev
