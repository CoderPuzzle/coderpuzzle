func pairSum(head *ListNode) int {
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}

	var reversedHalf *ListNode
	for slow != nil {
		following := slow.Next
		slow.Next = reversedHalf
		reversedHalf = slow
		slow = following
	}

	answer := 0
	first, second := head, reversedHalf
	for second != nil {
		if first.Val+second.Val > answer {
			answer = first.Val + second.Val
		}
		first = first.Next
		second = second.Next
	}
	return answer
}
