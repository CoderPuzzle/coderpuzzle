import java.util.HashMap;
import java.util.Map;

class Solution {

    public ListNode removeZeroSumSublists(ListNode head) {
        java.util.List<Integer> values = new java.util.ArrayList<>();
        for (ListNode node = head; node != null; node = node.next) {
            values.add(node.val);
        }

        // Prefix-sum scan: when a prefix repeats, drop every node between the
        // earlier occurrence and the current node (inclusive), then restart.
        boolean restart = true;
        while (restart) {
            restart = false;
            Map<Integer, Integer> prefixToIndex = new HashMap<>();
            prefixToIndex.put(0, -1);
            int prefix = 0;
            for (int i = 0; i < values.size(); i++) {
                prefix += values.get(i);
                if (prefixToIndex.containsKey(prefix)) {
                    int j = prefixToIndex.get(prefix);
                    values.subList(j + 1, i + 1).clear();
                    restart = true;
                    break;
                }
                prefixToIndex.put(prefix, i);
            }
        }

        ListNode dummy = new ListNode(0);
        ListNode current = dummy;
        for (int value : values) {
            current.next = new ListNode(value);
            current = current.next;
        }
        return dummy.next;
    }
}
