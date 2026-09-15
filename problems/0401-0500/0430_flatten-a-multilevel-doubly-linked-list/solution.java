class Solution {

    public MultiListNode flatten(MultiListNode head) {
        MultiListNode node = head;
        while (node != null) {
            if (node.child == null) {
                node = node.next;
                continue;
            }
            MultiListNode tail = node.child;
            while (tail.next != null) tail = tail.next;
            tail.next = node.next;
            if (node.next != null) node.next.prev = tail;
            node.next = node.child;
            node.child.prev = node;
            node.child = null;
            node = node.next;
        }
        return head;
    }
}
