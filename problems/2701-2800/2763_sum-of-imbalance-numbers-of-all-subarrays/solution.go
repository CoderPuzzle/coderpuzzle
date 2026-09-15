func sumImbalanceNumbers(nums []int) int {
	n := len(nums)
	total := 0
	for i := 0; i < n; i++ {
		// Seed with the single-element window: its imbalance is 0.
		seen := make([]bool, n+2)
		seen[nums[i]] = true
		cur := 0
		for j := i + 1; j < n; j++ {
			v := nums[j]
			if !seen[v] {
				lo := seen[v-1]
				hi := seen[v+1]
				if lo && hi {
					cur--
				} else if !lo && !hi {
					cur++
				}
				seen[v] = true
			}
			total += cur
		}
	}
	return total
}
