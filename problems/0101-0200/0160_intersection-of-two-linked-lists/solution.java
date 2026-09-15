class Solution {

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int lengthA = 0;
        int lengthB = 0;
        for (ListNode node = headA; node != null; node = node.next) ++lengthA;
        for (ListNode node = headB; node != null; node = node.next) ++lengthB;
        ListNode first = headA;
        ListNode second = headB;
        while (lengthA > lengthB) {
            first = first.next;
            --lengthA;
        }
        while (lengthB > lengthA) {
            second = second.next;
            --lengthB;
        }
        while (first != second) {
            first = first.next;
            second = second.next;
        }
        return first;
    }
}
