from typing import Optional


class Solution:
    def oddEvenList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head:
            return head
        # Two tail pointers step a pair at a time: the odd tail absorbs
        # the node after the even tail, the even tail the node after that.
        odd = head
        even_head = head.next
        even = even_head
        while even and even.next:
            odd.next = even.next
            odd = odd.next
            even.next = odd.next
            even = even.next
        # Splice the remembered even chain after the odd tail.
        odd.next = even_head
        return head
