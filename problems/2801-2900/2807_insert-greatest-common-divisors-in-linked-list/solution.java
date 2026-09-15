class Solution {

    public ListNode insertGreatestCommonDivisors(ListNode head) {
        // Original nodes only ever gain a successor, so one cursor splices each
        // gcd in place: rethread cur.next to a fresh node carrying the pair's
        // gcd, then hop to that untouched successor so the next original pair
        // is examined next and the walk stops on the final original node.
        ListNode cur = head;
        while (cur.next != null) {
            ListNode next = cur.next;
            cur.next = new ListNode(gcd(cur.val, next.val), next);
            cur = next;
        }
        return head;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            int t = a % b;
            a = b;
            b = t;
        }
        return a;
    }
}
