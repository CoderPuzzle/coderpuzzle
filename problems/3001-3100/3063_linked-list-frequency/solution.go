func frequenciesOfElements(head *ListNode) *ListNode {
	counts := make(map[int]int)
	var order []int
	for node := head; node != nil; node = node.Next {
		counts[node.Val]++
		if counts[node.Val] == 1 {
			order = append(order, node.Val)
		}
	}
	dummy := &ListNode{}
	tail := dummy
	for _, value := range order {
		tail.Next = &ListNode{Val: counts[value]}
		tail = tail.Next
	}
	return dummy.Next
}
