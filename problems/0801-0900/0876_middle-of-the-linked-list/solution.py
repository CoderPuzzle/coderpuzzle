from typing import Optional


class Solution:
    def middleNode(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # fast takes two links for slow's one, so slow's offset stays half
        # of fast's; when fast cannot complete another stride, slow stands
        # on the second middle.
        slow = head
        fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow
