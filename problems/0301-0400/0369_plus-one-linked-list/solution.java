class Solution {

    public ListNode plusOne(ListNode head) {
        // A 0 sentinel absorbs the all-9 carry, so the list growing past
        // its head needs no special case.
        ListNode sentinel = new ListNode(0, head);
        // One walk parks `last` on the final non-9 digit — the only one a
        // +1 carry can ever reach; every 9 behind it rolls over to 0.
        ListNode last = sentinel;
        for (ListNode current = sentinel.next; current != null; current = current.next) {
            if (current.val != 9) {
                last = current;
            }
        }
        last.val++;
        for (ListNode current = last.next; current != null; current = current.next) {
            current.val = 0;
        }
        // The sentinel still holds 0 unless every digit was a 9.
        return sentinel.val == 1 ? sentinel : head;
    }
}
