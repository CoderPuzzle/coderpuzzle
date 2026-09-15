from typing import Optional


class Solution:
    def deleteDuplicates(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # A dummy node in front of the head makes deleting the original head
        # the same unlink as deleting any other node.
        dummy = ListNode(0, head)
        # tail marks the end of the kept prefix; the node after it is the
        # next one whose fate is still undecided.
        tail = dummy
        while tail.next:
            if tail.next.next and tail.next.next.val == tail.next.val:
                # A run of equals starts at tail.next: advance the link past
                # every copy of the value while tail itself stays put, so
                # each hop drops one more duplicate from the answer.
                value = tail.next.val
                while tail.next and tail.next.val == value:
                    tail.next = tail.next.next
            else:
                # Distinct from its successor (or last of the list): the
                # node survives and joins the kept prefix.
                tail = tail.next
        return dummy.next
