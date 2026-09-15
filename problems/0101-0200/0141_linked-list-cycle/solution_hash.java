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

    public boolean hasCycle(int[] values, int pos) {
        if (values.length == 0) {
            // Empty input is acyclic by convention.
            return false;
        }
        // Materialize the wire form: one node per value, then link in order.
        ListNode[] nodes = new ListNode[values.length];
        for (int i = 0; i < values.length; i++) {
            nodes[i] = new ListNode(values[i]);
        }
        for (int i = 0; i < nodes.length - 1; i++) {
            nodes[i].next = nodes[i + 1];
        }
        // Point the tail back at index pos to close the cycle.
        if (pos != -1) {
            nodes[nodes.length - 1].next = nodes[pos];
        }
        // Walk from the head remembering every node by identity; a cycle
        // traps the walk, so the first node to come around a second time
        // proves it.
        Set<ListNode> seen = new HashSet<>();
        ListNode node = nodes[0];
        while (node != null) {
            if (seen.contains(node)) {
                return true;
            }
            seen.add(node);
            node = node.next;
        }
        // The walk ran off the end of the list: no cycle.
        return false;
    }
}
