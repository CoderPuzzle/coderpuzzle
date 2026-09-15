func getIntersectionNode(first *ListNode, second *ListNode) *ListNode {
	a, b := first, second
	for a != b {
		if a == nil {
			a = second
		} else {
			a = a.Next
		}
		if b == nil {
			b = first
		} else {
			b = b.Next
		}
	}
	return a
}
