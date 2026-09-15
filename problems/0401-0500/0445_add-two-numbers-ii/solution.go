func addTwoNumbers(l1 *ListNode, l2 *ListNode) *ListNode {
	// Stacks reverse the reading order without touching the inputs: both
	// least-significant digits end up on top, so the ones columns line up
	// however the lengths differ.
	var stack1 []int
	var stack2 []int
	for node := l1; node != nil; node = node.Next {
		stack1 = append(stack1, node.Val)
	}
	for node := l2; node != nil; node = node.Next {
		stack2 = append(stack2, node.Val)
	}
	// Column addition from the least-significant end. Digits come out
	// least-significant first, so each new node is linked in front of the
	// previous one — front-insertion restores the required
	// most-significant-first order as the loop runs.
	var head *ListNode
	carry := 0
	// One loop condition covers every edge case at once: unequal lengths
	// and a leftover final carry (999 + 1 -> 1000). An empty stack simply
	// contributes nothing.
	for len(stack1) > 0 || len(stack2) > 0 || carry != 0 {
		total := carry
		if len(stack1) > 0 {
			total += stack1[len(stack1)-1]
			stack1 = stack1[:len(stack1)-1]
		}
		if len(stack2) > 0 {
			total += stack2[len(stack2)-1]
			stack2 = stack2[:len(stack2)-1]
		}
		// Split the column total into the new carry and the digit to emit.
		carry = total / 10
		head = &ListNode{Val: total % 10, Next: head}
	}
	return head
}
