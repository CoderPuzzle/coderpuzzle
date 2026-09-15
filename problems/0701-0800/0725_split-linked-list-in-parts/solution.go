func splitListToParts(head *ListNode, k int) []*ListNode {
	// First pass, count only: how many nodes are to spread over k parts.
	n := 0
	for node := head; node != nil; node = node.Next {
		n++
	}
	// Every part takes width = n / k nodes and the first extra = n % k
	// parts one more — the unique split whose sizes differ by at most one
	// with no earlier part smaller than a later one.
	width, extra := n/k, n%k
	parts := make([]*ListNode, 0, k)
	current := head
	for index := 0; index < k; index++ {
		// This part starts where the previous one was cut loose.
		parts = append(parts, current)
		size := width
		if index < extra {
			size++
		}
		// Hop to the part's last node. A zero-size part never enters the
		// loop (it arises only after every node was handed out, so current
		// is already nil), and a positive-size part always finds its
		// size - 1 successors because the sizes sum to n.
		for step := 1; step < size; step++ {
			current = current.Next
		}
		if current != nil {
			// Cut the part loose and let the next one start at its
			// successor.
			following := current.Next
			current.Next = nil
			current = following
		}
	}
	return parts
}
