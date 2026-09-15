func mostCompetitive(nums []int, k int) []int {
	// "Most competitive" is the lexicographically smallest length-k
	// subsequence — build it as a non-decreasing stack in one pass.
	stack := make([]int, 0, k)
	n := len(nums)
	for i := 0; i < n; i++ {
		value := nums[i]
		remaining := n - i
		// Drop strictly larger tops while enough unread values remain to
		// refill to k; the strict > keeps the earlier of equal values,
		// which changes nothing lexicographically.
		for len(stack) > 0 && stack[len(stack)-1] > value && len(stack)+remaining > k {
			stack = stack[:len(stack)-1]
		}
		// Append only while there is room; a full stack can only change
		// through eviction above.
		if len(stack) < k {
			stack = append(stack, value)
		}
	}
	return stack
}
