class Solution {

    public DoublyListNode toArray(ListNode head) {
        // `first` remembers the head to return; `tail` is the node every
        // fresh append points its `prev` back at. The first node is the one
        // append with no predecessor, so its `prev` stays null.
        DoublyListNode first = null;
        DoublyListNode tail = null;
        for (ListNode node = head; node != null; node = node.next) {
            DoublyListNode fresh = new DoublyListNode(node.val);
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
