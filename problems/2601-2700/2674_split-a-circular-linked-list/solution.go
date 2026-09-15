func splitCircularLinkedList(list *ListNode) []*ListNode {
	count := 1
	tail := list
	for tail.Next != list {
		tail = tail.Next
		count++
	}
	half := (count + 1) / 2
	firstTail := list
	for i := 0; i < half-1; i++ {
		firstTail = firstTail.Next
	}
	secondHead := firstTail.Next
	secondTail := secondHead
	for secondTail.Next != list {
		secondTail = secondTail.Next
	}
	firstTail.Next = list
	secondTail.Next = secondHead
	return []*ListNode{list, secondHead}
}
