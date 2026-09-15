from typing import Optional


class Solution:
    def gameResult(self, head: Optional[ListNode]) -> str:
        # The two values of a pair can never be equal: every even-indexed
        # value is even and every odd-indexed value is odd. One strict
        # comparison therefore always awards exactly one point per pair.
        even_wins = odd_wins = 0
        node = head
        while node:
            if node.val > node.next.val:
                even_wins += 1
            else:
                odd_wins += 1
            node = node.next.next
        if even_wins > odd_wins:
            return "Even"
        if odd_wins > even_wins:
            return "Odd"
        return "Tie"
