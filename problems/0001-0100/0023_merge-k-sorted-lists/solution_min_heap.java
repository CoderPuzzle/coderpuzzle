import java.util.List;
import java.util.PriorityQueue;

class Solution {

    // Heap entry: value, input position (tie-break), and the head itself.
    private static class Entry {

        int val;
        int position;
        ListNode node;

        Entry(int val, int position, ListNode node) {
            this.val = val;
            this.position = position;
            this.node = node;
        }
    }

    public ListNode mergeKLists(List<ListNode> lists) {
        // Min-heap holding each surviving list's current head, keyed by
        // (value, input position): the next node of the output is always the
        // smallest head, and each list keeps exactly one entry in the heap.
        PriorityQueue<Entry> heap = new PriorityQueue<>((a, b) ->
            a.val != b.val ? Integer.compare(a.val, b.val) : Integer.compare(a.position, b.position)
        );
        for (int position = 0; position < lists.size(); position++) {
            ListNode head = lists.get(position);
            if (head != null) {
                heap.add(new Entry(head.val, position, head));
            }
        }
        // Dummy head: every attachment happens the same way and the real
        // head falls out as dummy.next.
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        while (!heap.isEmpty()) {
            Entry smallest = heap.poll();
            tail.next = smallest.node;
            tail = smallest.node;
            // The node's own list continues through its successor, which
            // re-enters the heap as that list's new single entry.
            if (smallest.node.next != null) {
                ListNode next = smallest.node.next;
                heap.add(new Entry(next.val, smallest.position, next));
            }
        }
        // Every list ran dry inside the loop, so the last attached node
        // already ends with null and the chain is complete.
        return dummy.next;
    }
}
