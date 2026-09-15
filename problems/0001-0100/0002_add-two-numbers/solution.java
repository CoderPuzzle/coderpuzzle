class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Dummy head anchors the result list so the first node is not a
        // special case; tail always points at the last node built.
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;
        int carry = 0;
        // One loop condition covers all edge cases at once: lists of unequal
        // length and a leftover final carry (5 + 5 -> [0, 1]).
        while (l1 != null || l2 != null || carry != 0) {
            // A list that has run out simply contributes nothing.
            int total = carry;
            if (l1 != null) {
                total += l1.val;
                l1 = l1.next;
            }
            if (l2 != null) {
                total += l2.val;
                l2 = l2.next;
            }
            // Split the column total into the new carry and the digit to append.
            carry = total / 10;
            tail.next = new ListNode(total % 10);
            tail = tail.next;
        }
        // Both inputs are exhausted and the carry is zero: the sum is complete.
        return dummy.next;
    }
}
