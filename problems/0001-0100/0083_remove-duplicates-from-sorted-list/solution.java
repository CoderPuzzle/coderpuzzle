class Solution {

    public ListNode deleteDuplicates(ListNode head) {
        // The list is sorted, so all copies of a value form one run; a kept
        // node only ever needs to look at its immediate successor.
        ListNode current = head;
        while (current != null && current.next != null) {
            if (current.next.val == current.val) {
                // The successor is a copy of a node already kept — unlink it.
                // The cursor stays put in case the run continues behind it.
                current.next = current.next.next;
            } else {
                // A different value begins a new run; only now step forward.
                current = current.next;
            }
        }
        return head;
    }
}
