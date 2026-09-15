import java.util.ArrayDeque;
import java.util.Deque;

class Solution {

    public ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        // Stacks reverse the reading order without touching the inputs:
        // both least-significant digits end up on top, so the ones
        // columns line up however the lengths differ.
        Deque<Integer> stack1 = new ArrayDeque<>();
        Deque<Integer> stack2 = new ArrayDeque<>();
        while (l1 != null) {
            stack1.push(l1.val);
            l1 = l1.next;
        }
        while (l2 != null) {
            stack2.push(l2.val);
            l2 = l2.next;
        }
        // Column addition from the least-significant end. Digits come out
        // least-significant first, so each new node is linked in front of
        // the previous one — front-insertion restores the required
        // most-significant-first order as the loop runs.
        ListNode head = null;
        int carry = 0;
        // One loop condition covers every edge case at once: unequal
        // lengths and a leftover final carry (999 + 1 -> 1000).
        while (!stack1.isEmpty() || !stack2.isEmpty() || carry != 0) {
            // An empty stack simply contributes nothing.
            int total = carry;
            if (!stack1.isEmpty()) {
                total += stack1.pop();
            }
            if (!stack2.isEmpty()) {
                total += stack2.pop();
            }
            // Split the column total into the new carry and the digit to emit.
            carry = total / 10;
            head = new ListNode(total % 10, head);
        }
        return head;
    }
}
