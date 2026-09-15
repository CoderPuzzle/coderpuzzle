/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func mergeNodes(head *ListNode) *ListNode {
	// One pass: skip the leading 0 sentinel, accumulate values until the
	// next 0, then that sum becomes a result node. The dummy head keeps
	// the first segment ordinary.
	dummy := &ListNode{}
	tail := dummy
	total := 0
	for node := head.Next; node != nil; node = node.Next {
		if node.Val == 0 {
			tail.Next = &ListNode{Val: total}
			tail = tail.Next
			total = 0
		} else {
			total += node.Val
		}
	}
	return dummy.Next
}
