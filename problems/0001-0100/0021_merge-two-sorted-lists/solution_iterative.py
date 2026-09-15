from typing import List, Optional


class Solution:
    def mergeTwoLists(self, list1: Optional[ListNode], list2: Optional[ListNode]) -> Optional[ListNode]:
        # Dummy head: every attachment happens the same way, with no special
        # case for the first node; the real head is simply dummy.next.
        dummy = ListNode(0)
        tail = dummy
        # Both lists sorted, so the merged list's next node is always the
        # smaller of the two current heads. Each iteration consumes one node
        # for good, bounding the walk by the combined length.
        while list1 and list2:
            # <= takes list1 on ties, keeping the merge stable with respect
            # to the first list.
            if list1.val <= list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next
        # Whatever survives is already the sorted continuation -- splice it
        # on in one assignment instead of walking it node by node.
        tail.next = list1 if list1 else list2
        return dummy.next
