// toArray rewinds through the prev pointers until one is empty, which
// leaves the cursor standing on the head, then one forward sweep reads
// the values out already in order.
func toArray(node *DoublyListNode) []int {
	for node != nil && node.Prev != nil {
		node = node.Prev
	}
	values := []int{}
	for ; node != nil; node = node.Next {
		values = append(values, node.Val)
	}
	return values
}
