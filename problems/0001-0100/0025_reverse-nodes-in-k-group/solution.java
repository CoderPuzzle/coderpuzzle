class Solution {

    public ListNode reverseKGroup(ListNode head, int k) {
        // The dummy head anchors the node before the group being reversed,
        // so rewiring the first group is no special case.
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode groupPrev = dummy;
        while (true) {
            // Probe k nodes ahead; a short group means the leftover tail
            // stays as it is and the list is finished.
            ListNode kth = groupPrev;
            for (int i = 0; i < k; i++) {
                kth = kth.next;
                if (kth == null) {
                    return dummy.next;
                }
            }
            // Flip exactly k links; `prev` starts at the node after the group
            // so the group's new tail joins the rest of the list naturally.
            ListNode after = kth.next;
            ListNode prev = after;
            ListNode curr = groupPrev.next;
            while (curr != after) {
                ListNode next = curr.next;
                curr.next = prev;
                prev = curr;
                curr = next;
            }
            // `prev` is the group's new head; the old first node is now its
            // last node and anchors the next group.
            ListNode tail = groupPrev.next;
            groupPrev.next = prev;
            groupPrev = tail;
        }
    }
}
