func minOrAfterOperations(nums []int, k int) int {
	n := len(nums)
	total := 0
	for _, value := range nums {
		total |= value
	}

	groupsFor := func(forbidden int) int {
		groups := 0
		running := -1
		for _, value := range nums {
			running &= value
			if running&forbidden == 0 {
				groups++
				running = -1
			}
		}
		if running != -1 && groups == 0 {
			return -1
		}
		return groups
	}

	forbidden := 0
	for bit := 29; bit >= 0; bit-- {
		candidate := forbidden | 1<<bit
		groups := groupsFor(candidate)
		if groups != -1 && n-groups <= k {
			forbidden = candidate
		}
	}
	return total &^ forbidden
}
