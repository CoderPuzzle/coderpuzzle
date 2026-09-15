func destroyTargets(nums []int, space int) int {
	// Two targets are destroyed by one seed exactly when their values
	// share a residue modulo space (their difference is a multiple of
	// space), so group nums by nums[i] % space. The smallest value of
	// the largest group seeds the machine and wipes the whole group.
	counts := make(map[int]int)
	mins := make(map[int]int)
	for _, value := range nums {
		r := value % space
		counts[r]++
		current, seen := mins[r]
		if !seen || value < current {
			mins[r] = value
		}
	}
	best := 0
	for _, count := range counts {
		if count > best {
			best = count
		}
	}
	answer := -1
	for r, count := range counts {
		if count == best && (answer == -1 || mins[r] < answer) {
			answer = mins[r]
		}
	}
	return answer
}
