import java.util.HashMap;
import java.util.Map;

/**
 * Definition for singly-linked list.
 * public class ListNode { int val; ListNode next; ListNode() {}
 * ListNode(int val) { this.val = val; } ListNode(int val, ListNode next) {
 * this.val = val; this.next = next; } }
 */
class Solution {

    public ListNode deleteDuplicatesUnsorted(ListNode head) {
        // Two passes: count every value, then keep only the values whose
        // count is exactly one. A dummy node makes deleting the head a
        // non-case.
        Map<Integer, Integer> count = new HashMap<>();
        for (ListNode node = head; node != null; node = node.next) {
            count.merge(node.val, 1, Integer::sum);
        }
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        for (ListNode node = head; node != null; node = node.next) {
            if (count.get(node.val) == 1) {
                tail.next = node;
                tail = tail.next;
            }
        }
        tail.next = null;
        return dummy.next;
    }
}
