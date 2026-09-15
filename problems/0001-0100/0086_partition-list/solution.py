from typing import Optional


class Solution:
    def partition(self, head: Optional[ListNode], x: int) -> Optional[ListNode]:
        # Two dummy heads anchor the chains of nodes below x and of all the
        # rest; each tail remembers where that chain's next node will attach.
        before_head = ListNode(0)
        before_tail = before_head
        after_head = ListNode(0)
        after_tail = after_head
        node = head
        while node:
            # Append to whichever chain claims the value: the walk order is
            # the append order, so each partition keeps its original order.
            if node.val < x:
                before_tail.next = node
                before_tail = node
            else:
                after_tail.next = node
                after_tail = node
            node = node.next
        # Splice the high chain onto the low one. The high tail's old link
        # still points into the low chain, so cutting it to None is what
        # keeps the spliced list from looping back on itself.
        before_tail.next = after_head.next
        after_tail.next = None
        return before_head.next
