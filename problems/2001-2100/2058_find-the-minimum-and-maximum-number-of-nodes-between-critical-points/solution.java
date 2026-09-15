class Solution {

    public int[] nodesBetweenCriticalPoints(ListNode head) {
        ListNode previous = head;
        ListNode current = head.next;
        int index = 1;
        int first = -1;
        int last = -1;
        int minimumGap = Integer.MAX_VALUE;

        while (current.next != null) {
            ListNode following = current.next;
            if (
                (current.val > previous.val && current.val > following.val) ||
                (current.val < previous.val && current.val < following.val)
            ) {
                if (first == -1) {
                    first = index;
                } else {
                    minimumGap = Math.min(minimumGap, index - last);
                }
                last = index;
            }
            previous = current;
            current = following;
            index++;
        }

        if (first == last) {
            return new int[] { -1, -1 };
        }
        return new int[] { minimumGap, last - first };
    }
}
