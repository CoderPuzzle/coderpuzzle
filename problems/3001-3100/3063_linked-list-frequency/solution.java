import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

class Solution {

    public ListNode frequenciesOfElements(ListNode head) {
        Map<Integer, Integer> counts = new HashMap<>();
        List<Integer> order = new ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) {
            int count = counts.getOrDefault(node.val, 0) + 1;
            counts.put(node.val, count);
            if (count == 1) {
                order.add(node.val);
            }
        }
        ListNode dummy = new ListNode();
        ListNode tail = dummy;
        for (int value : order) {
            tail.next = new ListNode(counts.get(value));
            tail = tail.next;
        }
        return dummy.next;
    }
}
