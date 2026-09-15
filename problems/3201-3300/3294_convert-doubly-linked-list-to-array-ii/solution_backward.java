import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] toArray(DoublyListNode node) {
        // Walk `next` to the tail without collecting anything; the backward
        // sweep over `prev` then gathers the whole list, tail first. One
        // mirrored pass writes that tail-to-head sequence into the result
        // array back to front.
        while (node.next != null) {
            node = node.next;
        }
        List<Integer> backward = new ArrayList<>();
        for (; node != null; node = node.prev) {
            backward.add(node.val);
        }
        int[] values = new int[backward.size()];
        for (int index = 0; index < values.length; index++) {
            values[values.length - 1 - index] = backward.get(index);
        }
        return values;
    }
}
