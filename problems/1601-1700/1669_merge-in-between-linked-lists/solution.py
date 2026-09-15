from typing import Optional


class Solution:
    def mergeInBetween(
        self, list1: Optional[ListNode], a: int, b: int, list2: Optional[ListNode]
    ) -> Optional[ListNode]:
        # The splice needs two landmarks on list1 and one on list2. The
        # (a-1)th node — the last node that keeps its place in front of the
        # removed stretch — is found first, with the (b+1)th node — the
        # first survivor behind it — tracked alongside and then pushed on
        # b-a+2 further steps, all before any pointer moves.
        pre = list1
        after = list1
        for _ in range(a - 1):
            pre = pre.next
            after = after.next
        for _ in range(b - a + 2):
            after = after.next
        # Hang list2 off the (a-1)th node, walk to its last node, and link
        # that node to the survivor. The removed stretch is left
        # unreferenced; nothing before or after the splice is touched.
        pre.next = list2
        tail = list2
        while tail.next:
            tail = tail.next
        tail.next = after
        return list1
