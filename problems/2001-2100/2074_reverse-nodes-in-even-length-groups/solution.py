from typing import Optional


class Solution:
    def reverseEvenLengthGroups(self, head: Optional[ListNode]) -> Optional[ListNode]:
        dummy = ListNode(0)
        dummy.next = head
        before = dummy
        target_length = 1

        while before.next:
            group_end = before
            actual_length = 0
            while actual_length < target_length and group_end.next:
                group_end = group_end.next
                actual_length += 1

            if actual_length % 2 == 0:
                group_start = before.next
                group_next = group_end.next
                current = group_start
                previous = group_next
                for _ in range(actual_length):
                    following = current.next
                    current.next = previous
                    previous = current
                    current = following
                before.next = previous
                before = group_start
            else:
                before = group_end
            target_length += 1

        return dummy.next
