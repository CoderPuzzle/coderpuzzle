// Locating the middle without counting: fast takes two links for slow's
// one, so slow's offset stays half of fast's; when fast cannot complete
// another stride, slow stands on the second middle.
func middleNode(head *ListNode) *ListNode {
	slow := head
	fast := head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	return slow
}
