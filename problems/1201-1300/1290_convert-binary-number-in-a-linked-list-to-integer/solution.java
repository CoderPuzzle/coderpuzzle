class Solution {

    public int getDecimalValue(ListNode head) {
        // Horner's rule along the list: each new bit shifts everything
        // seen so far left by one and appends itself.
        int value = 0;
        for (ListNode node = head; node != null; node = node.next) {
            value = (value << 1) | node.val;
        }
        return value;
    }
}
