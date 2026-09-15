func nodesBetweenCriticalPoints(head *ListNode) []int {
	previous := head
	current := head.Next
	index := 1
	first := -1
	last := -1
	minimumGap := int(^uint(0) >> 1)

	for current.Next != nil {
		following := current.Next
		if current.Val > previous.Val && current.Val > following.Val || current.Val < previous.Val && current.Val < following.Val {
			if first == -1 {
				first = index
			} else if index-last < minimumGap {
				minimumGap = index - last
			}
			last = index
		}
		previous = current
		current = following
		index++
	}

	if first == last {
		return []int{-1, -1}
	}
	return []int{minimumGap, last - first}
}
