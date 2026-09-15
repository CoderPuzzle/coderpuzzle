from heapq import heappop, heappush


class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next


class Solution:
    def mergeKLists(self, lists: list[ListNode | None]) -> ListNode | None:
        # Min-heap holding each surviving list's current head, keyed by
        # (value, input position): the next node of the output is always the
        # smallest head, and each list keeps exactly one entry in the heap.
        heap: list[tuple[int, int, ListNode]] = []
        for position, head in enumerate(lists):
            if head is not None:
                # The position both breaks value ties (earlier list wins) and
                # keeps the heap from ever comparing the nodes themselves.
                heappush(heap, (head.val, position, head))
        # Dummy head: every attachment happens the same way and the real
        # head falls out as dummy.next.
        dummy = ListNode(0)
        tail = dummy
        while heap:
            _, position, node = heappop(heap)
            tail.next = node
            tail = node
            # The node's own list continues through its successor, which
            # re-enters the heap as that list's new single entry.
            if node.next is not None:
                heappush(heap, (node.next.val, position, node.next))
        # Every list ran dry inside the loop, so the last attached node
        # already ends with None and the chain is complete.
        return dummy.next
