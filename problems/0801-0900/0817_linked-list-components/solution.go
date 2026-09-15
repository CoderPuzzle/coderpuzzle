func numComponents(head *ListNode, nums []int) int {
	// O(1) membership tests: the set holds every value of nums once.
	wanted := make(map[int]bool, len(nums))
	for _, value := range nums {
		wanted[value] = true
	}
	components := 0
	previousIn := false
	for node := head; node != nil; node = node.Next {
		currentIn := wanted[node.Val]
		// A component starts exactly where membership turns on: this
		// node is in nums and its predecessor was not. The initial
		// false flag folds the head into the same rule — no predecessor.
		if currentIn && !previousIn {
			components++
		}
		previousIn = currentIn
	}
	return components
}
