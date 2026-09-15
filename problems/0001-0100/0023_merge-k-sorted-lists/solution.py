from typing import List, Optional


class Solution:
    def mergeKLists(self, lists: List[Optional[ListNode]]) -> Optional[ListNode]:
        # Drop null entries up front so [] and [[]] both collapse to an empty
        # candidate list and return None immediately.
        lists = [x for x in lists if x is not None]
        if not lists:
            return None

        def merge2(a, b):
            # Dummy head: every attachment happens the same way and the real
            # head falls out as dummy.next.
            dummy = ListNode(0)
            tail = dummy
            # Both lists sorted, so the merged list's next node is always the
            # smaller of the two current heads.
            while a and b:
                if a.val <= b.val:
                    tail.next = a
                    a = a.next
                else:
                    tail.next = b
                    b = b.next
                tail = tail.next
            # Splice whichever list still has nodes -- it is already the
            # sorted continuation.
            tail.next = a if a else b
            return dummy.next

        # Tournament rounds: merge adjacent pairs, halving the field each
        # round. Every surviving node is walked once per round across
        # ceil(log2 k) rounds, unlike sequential folding which can re-walk
        # one long list k times.
        while len(lists) > 1:
            merged = []
            for i in range(0, len(lists) - 1, 2):
                merged.append(merge2(lists[i], lists[i + 1]))
            # Odd count: the last list gets a bye into the next round.
            if len(lists) % 2 == 1:
                merged.append(lists[-1])
            lists = merged
        return lists[0]
