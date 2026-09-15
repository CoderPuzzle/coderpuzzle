// A 0 sentinel absorbs the all-9 carry, so the list growing past its head
// needs no special case. One walk parks last on the final non-9 digit — the
// only one a +1 carry can ever reach; every 9 behind it rolls over to 0, and
// the sentinel still holds 0 unless every digit was a 9.
func plusOne(head *ListNode) *ListNode {
	sentinel := &ListNode{Val: 0, Next: head}
	last := sentinel
	for current := sentinel.Next; current != nil; current = current.Next {
		if current.Val != 9 {
			last = current
		}
	}
	last.Val++
	for current := last.Next; current != nil; current = current.Next {
		current.Val = 0
	}
	if sentinel.Val == 1 {
		return sentinel
	}
	return head
}
