from typing import List, Optional


class Solution:
    def _merge(self, a, b):
        # Merge by pure relinking through a dummy head.
        dummy = ListNode(0)
        tail = dummy
        while a and b:
            # <= takes from the first half on ties, keeping the sort stable.
            if a.val <= b.val:
                tail.next = a
                a = a.next
            else:
                tail.next = b
                b = b.next
            tail = tail.next
        # Splice on whichever half still has nodes.
        tail.next = a if a else b
        return dummy.next

    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Base case: an empty or single-node list is already sorted.
        if head is None or head.next is None:
            return head
        # Halve with slow/fast pointers; fast starts one node ahead so slow
        # finishes on the last node of the left half — both halves are then
        # strictly shorter, which makes the recursion terminate.
        slow = head
        fast = head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        mid = slow.next
        slow.next = None
        left = self.sortList(head)
        right = self.sortList(mid)
        return self._merge(left, right)
