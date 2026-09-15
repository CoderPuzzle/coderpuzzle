class Solution {

    public ListNode swapPairs(ListNode head) {
        // Dummy head anchors the rewired list so the first pair is not a
        // special case; prev always points at the node before the next pair.
        ListNode dummy = new ListNode(0, head);
        ListNode prev = dummy;
        // A pair needs two nodes; a lone leftover tail stays where it is.
        while (prev.next != null && prev.next.next != null) {
            ListNode first = prev.next;
            ListNode second = first.next;
            // Cross the two forward pointers: first adopts the rest of the
            // list, second turns back onto first, prev adopts second. The
            // nodes themselves move — no value is ever written.
            first.next = second.next;
            second.next = first;
            prev.next = second;
            // first is now the tail of the swapped pair, so it is the
            // "node before the next pair".
            prev = first;
        }
        return dummy.next;
    }
}
