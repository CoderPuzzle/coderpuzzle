func getIntersectionNode(first *ListNode, second *ListNode) *ListNode {
	// Map keys are the pointers themselves: nodes are matched by identity,
	// never by their values.
	inFirst := make(map[*ListNode]bool)
	for node := first; node != nil; node = node.Next {
		inFirst[node] = true
	}
	for node := second; node != nil; node = node.Next {
		if inFirst[node] {
			return node
		}
	}
	return nil
}
