// The wire names the node by its value; values are unique, so one walk from
// the head finds exactly the node to delete — and the deletion itself never
// touches a predecessor: the named node absorbs its successor's value, then
// bypasses the successor, so the successor is the node that actually dies.
func deleteNode(head *ListNode, node int) *ListNode {
	current := head
	for current.Val != node {
		current = current.Next
	}
	current.Val = current.Next.Val
	current.Next = current.Next.Next
	return head
}
