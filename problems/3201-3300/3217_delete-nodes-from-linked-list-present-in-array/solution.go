// O(1) membership tests: the set holds every value of nums once; one
// dummy-headed walk skips every match and the survivor chain hangs off
// the dummy.
func modifiedList(nums []int, head *ListNode) *ListNode {
	remove := make(map[int]bool, len(nums))
	for _, value := range nums {
		remove[value] = true
	}
	// A dummy head stands in front of the real list, so deleting the original
	// head is an ordinary unlink of somebody's successor.
	dummy := &ListNode{}
	dummy.Next = head
	current := dummy
	for current.Next != nil {
		if remove[current.Next.Val] {
			// Skip the matching node. The cursor stays put — the node behind
			// it may match too, and that node is now current.Next.
			current.Next = current.Next.Next
		} else {
			// A keeper: step onto it and look at what follows.
			current = current.Next
		}
	}
	return dummy.Next
}
