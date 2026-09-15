#include <stack>

class Solution {
  public:
    ListNode *addTwoNumbers(ListNode *l1, ListNode *l2) {
        // Stacks reverse the reading order without touching the inputs:
        // both least-significant digits end up on top, so the ones
        // columns line up however the lengths differ.
        std::stack<int> stack1;
        std::stack<int> stack2;
        for (ListNode *digit = l1; digit; digit = digit->next) {
            stack1.push(digit->val);
        }
        for (ListNode *digit = l2; digit; digit = digit->next) {
            stack2.push(digit->val);
        }
        // Column addition from the least-significant end. Digits come out
        // least-significant first, so each new node is linked in front of
        // the previous one — front-insertion restores the required
        // most-significant-first order as the loop runs.
        ListNode *head = nullptr;
        int carry = 0;
        // One loop condition covers every edge case at once: unequal
        // lengths and a leftover final carry (999 + 1 -> 1000).
        while (!stack1.empty() || !stack2.empty() || carry) {
            // An empty stack simply contributes nothing.
            int total = carry;
            if (!stack1.empty()) {
                total += stack1.top();
                stack1.pop();
            }
            if (!stack2.empty()) {
                total += stack2.top();
                stack2.pop();
            }
            // Split the column total into the new carry and the digit to emit.
            carry = total / 10;
            ListNode *node = new ListNode(total % 10);
            node->next = head;
            head = node;
        }
        return head;
    }
};
