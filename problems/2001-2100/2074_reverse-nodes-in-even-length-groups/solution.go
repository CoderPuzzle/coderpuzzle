func reverseEvenLengthGroups(head *ListNode) *ListNode {
	dummy := &ListNode{Val: 0, Next: head}
	before := dummy
	targetLength := 1

	for before.Next != nil {
		groupEnd := before
		actualLength := 0
		for actualLength < targetLength && groupEnd.Next != nil {
			groupEnd = groupEnd.Next
			actualLength++
		}

		if actualLength%2 == 0 {
			groupStart := before.Next
			current := groupStart
			previous := groupEnd.Next
			for i := 0; i < actualLength; i++ {
				following := current.Next
				current.Next = previous
				previous = current
				current = following
			}
			before.Next = previous
			before = groupStart
		} else {
			before = groupEnd
		}
		targetLength++
	}

	return dummy.Next
}
