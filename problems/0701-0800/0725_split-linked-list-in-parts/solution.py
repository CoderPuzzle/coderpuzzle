from typing import List, Optional


# Bundle-provided types (assembled with this submission):
#   ListNode:  .val int, .next ListNode | None
#   TreeNode:  .val int, .left / .right TreeNode | None


class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        # First pass, count only: how many nodes are to spread over k parts.
        n = 0
        node = head
        while node is not None:
            n += 1
            node = node.next
        # Every part takes width = n // k nodes and the first extra = n % k
        # parts one more — the unique split whose sizes differ by at most
        # one with no earlier part smaller than a later one.
        width, extra = divmod(n, k)
        parts: List[Optional[ListNode]] = []
        current = head
        for index in range(k):
            # This part starts where the previous one was cut loose.
            parts.append(current)
            # Hop to the part's last node. A zero-size part never enters
            # the loop (it arises only after every node was handed out, so
            # current is already None), and a positive-size part always
            # finds its size - 1 successors because the sizes sum to n.
            for _ in range(width + (1 if index < extra else 0) - 1):
                current = current.next
            if current is not None:
                # Cut the part loose and let the next one start at its
                # successor.
                following = current.next
                current.next = None
                current = following
        return parts
