from typing import Optional

from math import gcd


class Solution:
    def insertGreatestCommonDivisors(self, head: Optional[ListNode]) -> Optional[ListNode]:
        # Original nodes only ever gain a successor, so one cursor splices each
        # gcd in place: rethread cur.next to a fresh node carrying the pair's
        # gcd, then hop to that untouched successor so the next original pair
        # is examined next and the walk stops on the final original node.
        cur = head
        while cur.next is not None:
            nxt = cur.next
            cur.next = ListNode(gcd(cur.val, nxt.val), nxt)
            cur = nxt
        return head
