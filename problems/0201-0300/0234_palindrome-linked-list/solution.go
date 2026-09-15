// A palindrome's back half, read forward, repeats its front half, so the back
// half is reversed in place and walked against the front. Slow and fast
// pointers find the middle in one pass without copying any values.
func isPalindrome(head *ListNode) bool {
	// Slow steps one node, fast two, so when fast runs off the end slow
	// stands at the front of the back half.
	slow, fast := head, head
	for fast != nil && fast.Next != nil {
		slow = slow.Next
		fast = fast.Next.Next
	}
	// Reverse the back half in place: unlink each node and prepend it,
	// so the back half reads backward from second.
	var second *ListNode
	for slow != nil {
		follow := slow.Next
		slow.Next = second
		second = slow
		slow = follow
	}
	// Compare the halves in lockstep; an odd length parks the middle node
	// at the tail of second, where it faces itself.
	left := head
	for second != nil {
		if left.Val != second.Val {
			return false
		}
		left = left.Next
		second = second.Next
	}
	return true
}
