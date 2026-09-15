/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
    // Stacks reverse the reading order without touching the inputs:
    // both least-significant digits end up on top, so the ones
    // columns line up however the lengths differ.
    let stack1 = [];
    let stack2 = [];
    while (l1 !== null) {
        stack1.push(l1.val);
        l1 = l1.next;
    }
    while (l2 !== null) {
        stack2.push(l2.val);
        l2 = l2.next;
    }
    // Column addition from the least-significant end. Digits come out
    // least-significant first, so each new node is linked in front of
    // the previous one — front-insertion restores the required
    // most-significant-first order as the loop runs.
    let head = null;
    let carry = 0;
    // One loop condition covers every edge case at once: unequal
    // lengths and a leftover final carry (999 + 1 -> 1000).
    while (stack1.length > 0 || stack2.length > 0 || carry !== 0) {
        // An empty stack simply contributes nothing.
        let total = carry;
        if (stack1.length > 0) {
            total += stack1.pop();
        }
        if (stack2.length > 0) {
            total += stack2.pop();
        }
        // Split the column total into the new carry and the digit to emit.
        carry = Math.floor(total / 10);
        head = new ListNode(total % 10, head);
    }
    return head;
};
