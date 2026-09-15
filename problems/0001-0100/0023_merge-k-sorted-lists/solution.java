import java.util.List;

class Solution {

    public ListNode mergeKLists(List<ListNode> lists) {
        if (lists == null || lists.isEmpty()) return null;
        java.util.List<ListNode> cur = new java.util.ArrayList<>(lists);
        // Tournament rounds: merge adjacent pairs, halving the field each
        // round. Every surviving node is walked once per round across
        // ceil(log2 k) rounds, unlike sequential folding which can re-walk
        // one long list k times.
        while (cur.size() > 1) {
            java.util.List<ListNode> next = new java.util.ArrayList<>();
            for (int i = 0; i < cur.size(); i += 2) {
                if (i + 1 < cur.size()) {
                    next.add(merge2(cur.get(i), cur.get(i + 1)));
                } else {
                    // Odd count: the last list gets a bye, passing to the
                    // next round untouched.
                    next.add(cur.get(i));
                }
            }
            cur = next;
        }
        return cur.get(0);
    }

    private ListNode merge2(ListNode a, ListNode b) {
        // Dummy head: every attachment happens the same way and the real
        // head falls out as dummy.next.
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        // Both lists sorted, so the merged list's next node is always the
        // smaller of the two current heads.
        while (a != null && b != null) {
            if (a.val <= b.val) {
                tail.next = a;
                a = a.next;
            } else {
                tail.next = b;
                b = b.next;
            }
            tail = tail.next;
        }
        // Splice whichever list still has nodes -- it is already the sorted
        // continuation.
        tail.next = a != null ? a : b;
        return dummy.next;
    }
}
