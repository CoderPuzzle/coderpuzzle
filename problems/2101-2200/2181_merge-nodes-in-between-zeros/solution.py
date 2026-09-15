class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeNodes(self, head: ListNode | None) -> ListNode | None:
        # One pass: skip the leading 0 sentinel, accumulate values until
        # the next 0, then that sum becomes a result node. The dummy head
        # keeps the first segment ordinary.
        dummy = ListNode(0)
        tail = dummy
        node = head.next
        total = 0
        while node:
            if node.val == 0:
                tail.next = ListNode(total)
                tail = tail.next
                total = 0
            else:
                total += node.val
            node = node.next
        return dummy.next
