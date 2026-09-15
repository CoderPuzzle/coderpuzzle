class Solution {

    public ListNode removeNthFromEnd(ListNode head, int n) {
        // A dummy node in front of the head makes removing the true head the
        // same unlink as any other node.
        ListNode dummy = new ListNode(0, head);
        // fast runs n nodes ahead of slow; when fast falls off the end, slow
        // stands on the predecessor of the node being removed.
        ListNode fast = dummy;
        ListNode slow = dummy;
        for (int i = 0; i < n; ++i) {
            fast = fast.next;
        }
        while (fast.next != null) {
            fast = fast.next;
            slow = slow.next;
        }
        slow.next = slow.next.next;
        return dummy.next;
    }
}
