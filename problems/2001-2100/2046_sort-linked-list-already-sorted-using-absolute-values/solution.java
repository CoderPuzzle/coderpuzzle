class Solution {

    public ListNode sortLinkedList(ListNode head) {
        if (head == null) return null;

        ListNode current = head;
        while (current.next != null) {
            ListNode node = current.next;
            if (node.val < 0) {
                current.next = node.next;
                node.next = head;
                head = node;
            } else {
                current = node;
            }
        }
        return head;
    }
}
