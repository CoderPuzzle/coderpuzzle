// One sweep pins both targets: a first cursor stops on the kth node from
// the front, and a scout running from it to the tail carries a second
// cursor — started at the head — to the kth node from the end. Only the
// two values change hands.
func swapNodes(head *ListNode, k int) *ListNode {
	// Pin the kth node from the front: k - 1 steps from the head, never
	// past the tail since k <= n.
	first := head
	for i := 0; i < k-1; i++ {
		first = first.Next
	}
	// The scout and the second cursor stay k - 1 nodes apart, so the
	// second cursor stops on the kth node from the end exactly when the
	// scout stops on the tail.
	second := head
	scout := first
	for scout.Next != nil {
		scout = scout.Next
		second = second.Next
	}
	// Every link, and the head itself, is untouched.
	first.Val, second.Val = second.Val, first.Val
	return head
}
