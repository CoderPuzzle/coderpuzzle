class Solution {

    public ListNode doubleIt(ListNode head) {
        // A position carries into the one above it exactly when its original
        // digit is five or more: doubling produces that carry by itself, and
        // an incoming carry of one never flips the outcome (2 * 4 + 1 = 9
        // stays). So one forward pass rewrites each node from its successor
        // while the successor still holds its original digit, and the
        // original head digit, remembered before any write, tells whether a
        // new leading node must be prepended.
        boolean grows = head.val >= 5;
        ListNode cur = head;
        while (cur != null) {
            ListNode next = cur.next;
            int inc = next != null && next.val >= 5 ? 1 : 0;
            cur.val = (cur.val * 2 + inc) % 10;
            cur = next;
        }
        if (grows) {
            ListNode node = new ListNode(1);
            node.next = head;
            return node;
        }
        return head;
    }
}
