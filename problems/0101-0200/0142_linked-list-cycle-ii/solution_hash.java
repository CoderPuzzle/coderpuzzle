import java.util.HashSet;
import java.util.Set;

class Solution {

    private static final class ListNode {

        int val;
        ListNode next;

        ListNode(int val) {
            this.val = val;
        }
    }

    public int detectCycle(int[] values, int pos) {
        if (values.length == 0) {
            return -1;
        }
        // Materialize the wire form: one node per value, tail back to pos.
        ListNode[] nodes = new ListNode[values.length];
        for (int i = 0; i < values.length; i++) {
            nodes[i] = new ListNode(values[i]);
        }
        for (int i = 0; i < nodes.length - 1; i++) {
            nodes[i].next = nodes[i + 1];
        }
        if (pos != -1) {
            nodes[nodes.length - 1].next = nodes[pos];
        }
        // Walk from the head remembering every node by identity. The first
        // node to come around a second time is the cycle's entry; running
        // off the end instead means no cycle.
        Set<ListNode> seen = new HashSet<>();
        ListNode node = nodes[0];
        while (node != null && !seen.contains(node)) {
            seen.add(node);
            node = node.next;
        }
        if (node == null) {
            return -1;
        }
        // The judge wants an index: count steps from the head to the entry.
        int index = 0;
        ListNode entry = nodes[0];
        while (entry != node) {
            entry = entry.next;
            index++;
        }
        return index;
    }
}
