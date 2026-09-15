/**
 * Definition for singly-linked list. type ListNode struct { Val int Next
 * *ListNode }
 */
func deleteDuplicatesUnsorted(head *ListNode) *ListNode {
	// Two passes: count every value, then keep only the values whose
	// count is exactly one. A dummy node makes deleting the head a
	// non-case.
	count := make(map[int]int)
	for node := head; node != nil; node = node.Next {
		count[node.Val]++
	}
	dummy := &ListNode{Val: 0}
	tail := dummy
	for node := head; node != nil; node = node.Next {
		if count[node.Val] == 1 {
			tail.Next = node
			tail = tail.Next
		}
	}
	tail.Next = nil
	return dummy.Next
}
