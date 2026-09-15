// Sweep one reads: the values ride out the walk in a buffer. Sweep two
// chains: every buffered value becomes a node appended to the growing
// tail, pointing back at the node before it.
func toArray(head *ListNode) *DoublyListNode {
	values := []int{}
	for node := head; node != nil; node = node.Next {
		values = append(values, node.Val)
	}
	var first, tail *DoublyListNode
	for _, value := range values {
		fresh := &DoublyListNode{Val: value}
		if tail != nil {
			tail.Next = fresh
			fresh.Prev = tail
		} else {
			first = fresh
		}
		tail = fresh
	}
	return first
}
