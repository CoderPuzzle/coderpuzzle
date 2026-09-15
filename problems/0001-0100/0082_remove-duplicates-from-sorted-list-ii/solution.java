class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        // A dummy node in front of the head makes deleting the original head
        // the same unlink as deleting any other node.
        ListNode dummy = new ListNode(0, head);
        // tail marks the end of the kept prefix; the node after it is the
        // next one whose fate is still undecided.
        ListNode tail = dummy;
        while (tail.next != null) {
            if (tail.next.next != null && tail.next.next.val == tail.next.val) {
                // A run of equals starts at tail.next: advance the link past
                // every copy of the value while tail itself stays put, so
                // each hop drops one more duplicate from the answer.
                int value = tail.next.val;
                while (tail.next != null && tail.next.val == value) {
                    tail.next = tail.next.next;
                }
            } else {
                // Distinct from its successor (or last of the list): the
                // node survives and joins the kept prefix.
                tail = tail.next;
            }
        }
        return dummy.next;
    }
}
