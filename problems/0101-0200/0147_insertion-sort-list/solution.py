from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def insertionSortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Dummy node: every insertion, even the one before the first node,
        # links into a predecessor that already exists; the sorted list hangs
        # off it and dummy.next is returned at the end.
        dummy = ListNode(0, head)
        # sorted_tail closes the already-sorted prefix; whatever follows it is
        # untouched input. An empty list or a lone node is sorted already.
        sorted_tail = head
        while sorted_tail is not None and sorted_tail.next is not None:
            node = sorted_tail.next
            # In order against the prefix's end: the node stays put and the
            # prefix just grows — the near-linear path sorted input takes.
            if node.val >= sorted_tail.val:
                sorted_tail = sorted_tail.next
                continue
            # Unlink the node, then walk the prefix for the first value
            # greater than it; prev stops on that value's predecessor.
            sorted_tail.next = node.next
            prev = dummy
            while prev.next.val <= node.val:
                prev = prev.next
            node.next = prev.next
            prev.next = node
        return dummy.next
