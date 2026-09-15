class Solution {

    public ListNode middleNode(ListNode head) {
        // fast takes two links for slow's one, so slow's offset stays half
        // of fast's; when fast cannot complete another stride, slow stands
        // on the second middle.
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }
}
