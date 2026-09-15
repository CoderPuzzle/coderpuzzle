from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def sortLinkedList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if head is None:
            return None

        current = head
        while current.next is not None:
            node = current.next
            if node.val < 0:
                current.next = node.next
                node.next = head
                head = node
            else:
                current = node
        return head
