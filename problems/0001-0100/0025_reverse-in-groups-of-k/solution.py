# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next


class Solution:
    def reverseInGroups(self, head: ListNode | None, k: int) -> ListNode | None:
        # The dummy head anchors the node before the group being reversed,
        # so rewiring the first group is no special case.
        dummy = ListNode(0)
        dummy.next = head
        group_prev = dummy
        while True:
            # Probe k nodes ahead; a short group means the leftover tail
            # stays as it is and the list is finished.
            kth = group_prev
            for _ in range(k):
                kth = kth.next
                if kth is None:
                    return dummy.next
            # Flip exactly k links; `prev` starts at the node after the group
            # so the group's new tail joins the rest of the list naturally.
            after = kth.next
            prev, curr = after, group_prev.next
            while curr is not after:
                curr.next, prev, curr = prev, curr, curr.next
            # `prev` is the group's new head; the old first node is now its
            # last node and anchors the next group.
            tail = group_prev.next
            group_prev.next = prev
            group_prev = tail
