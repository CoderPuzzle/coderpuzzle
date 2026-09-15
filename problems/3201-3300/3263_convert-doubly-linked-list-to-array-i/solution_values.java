import java.util.ArrayList;
import java.util.List;

class Solution {

    public DoublyListNode toArray(ListNode head) {
        // Sweep one reads: the values ride out the walk in a buffer.
        List<Integer> values = new ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) {
            values.add(node.val);
        }
        // Sweep two chains: every buffered value becomes a node appended to
        // the growing tail, pointing back at the node before it.
        DoublyListNode first = null;
        DoublyListNode tail = null;
        for (int value : values) {
            DoublyListNode fresh = new DoublyListNode(value);
            if (tail != null) {
                tail.next = fresh;
                fresh.prev = tail;
            } else {
                first = fresh;
            }
            tail = fresh;
        }
        return first;
    }
}
