func removeZeroSumSublists(head *ListNode) *ListNode {
	values := []int{}
	for node := head; node != nil; node = node.Next {
		values = append(values, node.Val)
	}

	// Prefix-sum scan: when a prefix repeats, drop every node between the
	// earlier occurrence and the current node (inclusive), then restart.
	restart := true
	for restart {
		restart = false
		prefixToIndex := map[int]int{0: -1}
		prefix := 0
		for i := 0; i < len(values); i++ {
			prefix += values[i]
			if j, ok := prefixToIndex[prefix]; ok {
				values = append(values[:j+1], values[i+1:]...)
				restart = true
				break
			}
			prefixToIndex[prefix] = i
		}
	}

	dummy := &ListNode{}
	current := dummy
	for _, value := range values {
		current.Next = &ListNode{Val: value}
		current = current.Next
	}
	return dummy.Next
}
