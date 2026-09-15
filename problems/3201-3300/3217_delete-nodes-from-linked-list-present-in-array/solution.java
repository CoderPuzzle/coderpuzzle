import java.util.HashSet;
import java.util.Set;

class Solution {

    public ListNode modifiedList(int[] nums, ListNode head) {
        // O(1) membership tests: the set holds every value of nums once.
        Set<Integer> remove = new HashSet<>();
        for (int value : nums) {
            remove.add(value);
        }
        // A dummy head stands in front of the real list, so deleting the
        // original head is an ordinary unlink of somebody's successor.
        ListNode dummy = new ListNode(0);
        dummy.next = head;
        ListNode current = dummy;
        while (current.next != null) {
            if (remove.contains(current.next.val)) {
                // Skip the matching node. The cursor stays put — the node
                // behind it may match too, and that node is now current.next.
                current.next = current.next.next;
            } else {
                // A keeper: step onto it and look at what follows.
                current = current.next;
            }
        }
        return dummy.next;
    }
}
