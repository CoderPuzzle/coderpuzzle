from typing import List, Optional


class Solution:
    def removeNodes(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Reverse the list, then keep every node whose value is >= the max
        # seen so far (i.e. the max of the suffix in the original order),
        # building the result (back in original order) as we go.
        prev = None
        cur = head
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt

        new_head = None
        max_seen = float("-inf")
        cur = prev
        while cur:
            nxt = cur.next
            if cur.val >= max_seen:
                max_seen = cur.val
                cur.next = new_head
                new_head = cur
            cur = nxt
        return new_head
