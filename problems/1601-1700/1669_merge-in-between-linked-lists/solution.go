// One pass locates two landmarks on list1 and one on list2, then rewires
// two edges: the (a-1)th node keeps its place in front of the removed
// stretch, list2 fills the gap, and the (b+1)th node — the first
// survivor behind it — closes the list again.
func mergeInBetween(list1 *ListNode, a int, b int, list2 *ListNode) *ListNode {
	// pre walks to the (a-1)th node with after tracked alongside; after
	// then continues b-a+2 steps to the (b+1)th node, all before any
	// pointer moves.
	pre := list1
	after := list1
	for i := 0; i < a-1; i++ {
		pre = pre.Next
		after = after.Next
	}
	for i := 0; i < b-a+2; i++ {
		after = after.Next
	}
	// Hang list2 off the (a-1)th node, walk to its last node, and link
	// that node to the survivor. The removed stretch is left
	// unreferenced; nothing before or after the splice is touched.
	pre.Next = list2
	tail := list2
	for tail.Next != nil {
		tail = tail.Next
	}
	tail.Next = after
	return list1
}
