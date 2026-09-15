impl Solution {
    pub fn add_two_numbers(l1: Option<Box<ListNode>>, l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        // Stacks reverse the reading order: both least-significant digits
        // end up on top, so the ones columns line up however the lengths
        // differ. The inputs are consumed node by node — never reversed —
        // with each node's ownership transferred straight into its stack.
        let mut stack1 = Vec::new();
        let mut cursor = l1;
        while let Some(node) = cursor {
            stack1.push(node.val);
            cursor = node.next;
        }
        let mut stack2 = Vec::new();
        let mut cursor = l2;
        while let Some(node) = cursor {
            stack2.push(node.val);
            cursor = node.next;
        }
        // Column addition from the least-significant end. Digits come out
        // least-significant first, so each new node is linked in front of
        // the previous one — front-insertion restores the required
        // most-significant-first order as the loop runs.
        let mut head: Option<Box<ListNode>> = None;
        let mut carry = 0;
        // One loop condition covers every edge case at once: unequal
        // lengths and a leftover final carry (999 + 1 -> 1000). An empty
        // stack simply contributes nothing.
        while !stack1.is_empty() || !stack2.is_empty() || carry != 0 {
            let mut total = carry;
            if let Some(digit) = stack1.pop() {
                total += digit;
            }
            if let Some(digit) = stack2.pop() {
                total += digit;
            }
            // Split the column total into the new carry and the digit to emit.
            carry = total / 10;
            head = Some(Box::new(ListNode {
                val: total % 10,
                next: head,
            }));
        }
        head
    }
}
