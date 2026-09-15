# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def deleteDuplicatesUnsorted(self, head: ListNode) -> ListNode:
        # Two passes: count every value, then keep only the values whose
        # count is exactly one. A dummy node makes deleting the head a
        # non-case.
        count = {}
        node = head
        while node:
            count[node.val] = count.get(node.val, 0) + 1
            node = node.next
        dummy = ListNode(0)
        tail = dummy
        node = head
        while node:
            if count[node.val] == 1:
                tail.next = node
                tail = tail.next
            node = node.next
        tail.next = None
        return dummy.next
