func getDecimalValue(head *ListNode) int {
	// Horner's rule along the list: each new bit shifts everything seen so
	// far left by one and appends itself.
	value := 0
	for node := head; node != nil; node = node.Next {
		value = value<<1 | node.Val
	}
	return value
}
