class Solution {

    public boolean isPalindrome(ListNode head) {
        // Slow steps one node, fast two, so when fast runs off the end
        // slow stands at the front of the back half.
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        // Reverse the back half in place: unlink each node and prepend it,
        // so the back half reads backward from `second`.
        ListNode second = null;
        while (slow != null) {
            ListNode follow = slow.next;
            slow.next = second;
            second = slow;
            slow = follow;
        }
        // Compare the halves in lockstep; an odd length parks the middle
        // node at the tail of `second`, where it faces itself.
        ListNode left = head;
        while (second != null) {
            if (left.val != second.val) {
                return false;
            }
            left = left.next;
            second = second.next;
        }
        return true;
    }
}
