// Split the list at its middle, reverse the back half, then weave the
// two halves together — only next pointers are ever rewritten.
func reorderList(head *ListNode) *ListNode {
	// Lists of length 0 or 1 are already in the target order.
	if head == nil || head.Next == nil {
		return head
	}
	// Slow steps one node, fast two, so fast falls off the end while slow
	// stands on the last node of the front half.
	slow := head
	fast := head
	for fast.Next != nil && fast.Next.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	// Unhook the back half and reverse it in place: `prev` ends up as its
	// head, reading the original back half backwards.
	back := slow.Next
	slow.Next = nil
	var prev *ListNode
	for back != nil {
		back.Next, prev, back = prev, back, back.Next
	}
	// Weave: each front node hands its successor to the current back node
	// and takes that node in its place; the back chain, never longer than
	// the front, runs out first.
	front := head
	for prev != nil {
		nextFront, nextBack := front.Next, prev.Next
		front.Next = prev
		prev.Next = nextFront
		front, prev = nextFront, nextBack
	}
	return head
}
