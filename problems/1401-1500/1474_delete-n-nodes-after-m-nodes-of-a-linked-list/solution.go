// A dummy node in front of the head gives every cycle the same starting
// position: standing on the keep run's last node. The keep loop advances
// up to m nodes, the skip loop travels up to n past it, and one splice
// reattaches whatever survived the drop.
func deleteNodes(head *ListNode, m int, n int) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	node := dummy
	for node.Next != nil {
		for i := 0; i < m && node.Next != nil; i++ {
			node = node.Next
		}
		skipper := node
		for i := 0; i < n && skipper.Next != nil; i++ {
			skipper = skipper.Next
		}
		node.Next = skipper.Next
	}
	return dummy.Next
}
