class Solution {

    public int[] nextLargerNodes(ListNode head) {
        int n = 0;
        for (ListNode node = head; node != null; node = node.next) {
            n++;
        }
        int[] values = new int[n];
        int idx = 0;
        for (ListNode node = head; node != null; node = node.next) {
            values[idx++] = node.val;
        }
        int[] answer = new int[n];
        int[] stack = new int[n]; // indices with values in decreasing order
        int top = 0;
        for (int i = 0; i < n; i++) {
            while (top > 0 && values[stack[top - 1]] < values[i]) {
                answer[stack[--top]] = values[i];
            }
            stack[top++] = i;
        }
        return answer;
    }
}
