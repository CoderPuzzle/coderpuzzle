func insertGreatestCommonDivisors(head *ListNode) *ListNode {
	// Original nodes only ever gain a successor, so one cursor splices each gcd
	// in place: rethread cur.Next to a fresh node carrying the pair's gcd, then
	// hop to that untouched successor so the next original pair is examined
	// next and the walk stops on the final original node.
	cur := head
	for cur.Next != nil {
		next := cur.Next
		cur.Next = &ListNode{Val: gcd(cur.Val, next.Val), Next: next}
		cur = next
	}
	return head
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
