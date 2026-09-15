// The walk appends as it goes: `first` remembers the head to return and
// `tail` is the node every fresh node points its Prev back at. The first
// node is the one append with no predecessor, so its Prev stays nil.
func toArray(head *ListNode) *DoublyListNode {
	var first, tail *DoublyListNode
	for node := head; node != nil; node = node.Next {
		fresh := &DoublyListNode{Val: node.Val}
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
