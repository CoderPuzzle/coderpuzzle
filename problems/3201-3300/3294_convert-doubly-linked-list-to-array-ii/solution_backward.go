// toArray runs the next pointers out to the tail without collecting
// anything; the backward sweep over Prev then gathers the whole list,
// tail first. One in-place reverse turns that tail-to-head buffer into
// the answer.
func toArray(node *DoublyListNode) []int {
	for node != nil && node.Next != nil {
		node = node.Next
	}
	values := []int{}
	for ; node != nil; node = node.Prev {
		values = append(values, node.Val)
	}
	for left, right := 0, len(values)-1; left < right; left, right = left+1, right-1 {
		values[left], values[right] = values[right], values[left]
	}
	return values
}
