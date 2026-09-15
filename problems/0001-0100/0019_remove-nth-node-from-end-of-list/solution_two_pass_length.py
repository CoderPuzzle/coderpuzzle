from typing import Optional


class Solution:
    def removeNthFromEnd(self, head: Optional[ListNode], n: int) -> Optional[ListNode]:
        # First pass: count the nodes, so the target's position from the head
        # is known before anything is unlinked.
        sz = 0
        node = head
        while node:
            sz += 1
            node = node.next
        # The target is the (sz - n + 1)-th node from the head, so its
        # predecessor sits sz - n steps past the dummy; walking that far and
        # relinking drops the target without a special head case.
        dummy = ListNode(0, head)
        pred = dummy
        for _ in range(sz - n):
            pred = pred.next
        pred.next = pred.next.next
        return dummy.next
