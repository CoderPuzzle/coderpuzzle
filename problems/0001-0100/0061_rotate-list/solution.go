// Close the ring: measure the list, join tail to head, walk to the new
// tail, and cut — the rotation itself is then pure pointer arithmetic.
func rotateRight(head *ListNode, k int) *ListNode {
	// An empty list has nothing to rotate — and no length to mod by.
	if head == nil {
		return nil
	}
	// One walk measures the list and ends on its tail; linking the tail
	// back onto the head closes a ring, so rotation becomes pointer
	// arithmetic rather than node surgery.
	n := 1
	tail := head
	for tail.Next != nil {
		tail = tail.Next
		n++
	}
	tail.Next = head
	// Rotate by the remainder only; the new tail stands n - k steps
	// around the ring from the head (k = 0 lands on the old tail, and
	// the cut below simply restores the original list).
	k %= n
	newTail := head
	for i := 0; i < n-k-1; i++ {
		newTail = newTail.Next
	}
	newHead := newTail.Next
	newTail.Next = nil
	return newHead
}
