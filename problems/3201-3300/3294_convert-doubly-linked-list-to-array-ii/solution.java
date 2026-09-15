class Solution {

    public int[] toArray(DoublyListNode node) {
        // The `prev` chain walks back to the head; the loop exits standing
        // on it, however deep in the list the handed node was. One forward
        // sweep then reads the values out already in order.
        while (node.prev != null) {
            node = node.prev;
        }
        int length = 0;
        for (DoublyListNode walk = node; walk != null; walk = walk.next) {
            length++;
        }
        int[] values = new int[length];
        int index = 0;
        for (; node != null; node = node.next) {
            values[index] = node.val;
            index++;
        }
        return values;
    }
}
