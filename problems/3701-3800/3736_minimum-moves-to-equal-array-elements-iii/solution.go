func minMoves(nums []int) int {
	// Only increments exist, so every element must climb to a common target
	// at least as high as the largest value already present; the cheapest
	// such target is that largest value itself.
	target := nums[0]
	for _, num := range nums {
		if num > target {
			target = num
		}
	}
	// Each element pays exactly its own deficit to reach it, and the moves
	// never interact, so the answer sums the deficits directly.
	moves := 0
	for _, num := range nums {
		moves += target - num
	}
	return moves
}
