func mergeTwoLists(list1 *ListNode, list2 *ListNode) *ListNode {
	// Base case: an empty list is already sorted, so the other list —
	// whatever remains of it — is the merged continuation as is.
	if list1 == nil {
		return list2
	}
	if list2 == nil {
		return list1
	}
	// The smaller head stands in front; the recursion merges what follows
	// it with the untouched other list. <= keeps list1 first on ties,
	// matching the iterative merge's stability.
	if list1.Val <= list2.Val {
		list1.Next = mergeTwoLists(list1.Next, list2)
		return list1
	}
	list2.Next = mergeTwoLists(list1, list2.Next)
	return list2
}
