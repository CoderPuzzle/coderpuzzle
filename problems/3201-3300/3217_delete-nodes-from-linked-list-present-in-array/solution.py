from typing import List, Optional


class Solution:
    def modifiedList(self, nums: List[int], head: Optional[ListNode]) -> Optional[ListNode]:
        # O(1) membership tests: the set holds every value of nums once.
        remove = set(nums)
        # A dummy head stands in front of the real list, so deleting the
        # original head is an ordinary unlink of somebody's successor.
        dummy = ListNode(0)
        dummy.next = head
        current = dummy
        while current.next:
            if current.next.val in remove:
                # Skip the matching node. The cursor stays put — the node
                # behind it may match too, and that node is now current.next.
                current.next = current.next.next
            else:
                # A keeper: step onto it and look at what follows.
                current = current.next
        return dummy.next
