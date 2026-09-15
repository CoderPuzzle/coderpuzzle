from typing import Optional


class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        # Pin the kth node from the front first: k - 1 steps from the head,
        # never past the tail since k <= n.
        first = head
        for _ in range(k - 1):
            first = first.next
        # A scout runs from that node to the tail while a second cursor,
        # started at the head, moves alongside it; the pair stays k - 1
        # nodes apart, so the second cursor stops on the kth node from the
        # end exactly when the scout stops on the tail.
        second = head
        scout = first
        while scout.next:
            scout = scout.next
            second = second.next
        # Only the two values change hands; every link, and the head itself,
        # is untouched.
        first.val, second.val = second.val, first.val
        return head
