from typing import List, Optional


class Solution:
    def nodesBetweenCriticalPoints(self, head: Optional[ListNode]) -> List[int]:
        previous = head
        current = head.next
        index = 1
        first = -1
        last = -1
        minimum_gap = float("inf")

        while current.next is not None:
            following = current.next
            if (current.val > previous.val and current.val > following.val) or (
                current.val < previous.val and current.val < following.val
            ):
                if first == -1:
                    first = index
                else:
                    minimum_gap = min(minimum_gap, index - last)
                last = index
            previous = current
            current = following
            index += 1

        if first == last:
            return [-1, -1]
        return [int(minimum_gap), last - first]
