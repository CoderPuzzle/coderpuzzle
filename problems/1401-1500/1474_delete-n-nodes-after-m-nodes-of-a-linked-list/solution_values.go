// Sweep 1 records the values that survive each keep-m, drop-n cycle; a
// keep run cut short by the tail simply ends the walk, and a drop run
// steps past the nodes it loses. Sweep 2 rebuilds a fresh list from the
// surviving values.
func deleteNodes(head *ListNode, m int, n int) *ListNode {
	kept := []int{}
	node := head
	for node != nil {
		for i := 0; i < m && node != nil; i++ {
			kept = append(kept, node.Val)
			node = node.Next
		}
		for i := 0; i < n && node != nil; i++ {
			node = node.Next
		}
	}
	dummy := &ListNode{Val: 0}
	tail := dummy
	for _, value := range kept {
		tail.Next = &ListNode{Val: value}
		tail = tail.Next
	}
	return dummy.Next
}
