class Solution {

    public int pairSum(ListNode head) {
        ListNode slow = head;
        ListNode fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode reversedHalf = null;
        while (slow != null) {
            ListNode following = slow.next;
            slow.next = reversedHalf;
            reversedHalf = slow;
            slow = following;
        }

        int answer = 0;
        ListNode first = head;
        ListNode second = reversedHalf;
        while (second != null) {
            answer = Math.max(answer, first.val + second.val);
            first = first.next;
            second = second.next;
        }
        return answer;
    }
}
