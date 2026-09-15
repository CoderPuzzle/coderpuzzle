from typing import Optional


class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow = fast = head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        reversed_half = None
        while slow:
            following = slow.next
            slow.next = reversed_half
            reversed_half = slow
            slow = following

        answer = 0
        first = head
        second = reversed_half
        while second:
            answer = max(answer, first.val + second.val)
            first = first.next
            second = second.next
        return answer
