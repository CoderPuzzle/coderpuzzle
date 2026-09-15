/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
class Solution {

    public ListNode mergeNodes(ListNode head) {
        // One pass: skip the leading 0 sentinel, accumulate values until
        // the next 0, then that sum becomes a result node. The dummy head
        // keeps the first segment ordinary.
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        long total = 0;
        for (ListNode node = head.next; node != null; node = node.next) {
            if (node.val == 0) {
                tail.next = new ListNode((int) total);
                tail = tail.next;
                total = 0;
            } else {
                total += node.val;
            }
        }
        return dummy.next;
    }
}
