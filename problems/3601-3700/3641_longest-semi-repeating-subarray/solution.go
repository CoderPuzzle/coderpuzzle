func longestSubarray(nums []int, k int) int {
	// freq counts occurrences of each value inside the window; dup counts
	// how many values have been seen twice or more.
	freq := map[int]int{}
	dup, left, best := 0, 0, 0
	for right, value := range nums {
		freq[value]++
		if freq[value] == 2 {
			dup++
		}
		// Grow past k repeating values and the window must give ground until
		// one of them is fully evicted again.
		for dup > k {
			freq[nums[left]]--
			if freq[nums[left]] == 1 {
				dup--
			}
			left++
		}
		best = max(best, right-left+1)
	}
	return best
}
