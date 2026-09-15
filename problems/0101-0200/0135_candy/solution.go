func candy(ratings []int) int {
	n := len(ratings)
	// One candy per child is the minimum allowed.
	candies := make([]int, n)
	for i := range candies {
		candies[i] = 1
	}
	// Left-to-right: enforce the left-neighbor rule with the smallest value
	// exceeding the left neighbor's allotment.
	for i := 1; i < n; i++ {
		if ratings[i] > ratings[i-1] {
			candies[i] = candies[i-1] + 1
		}
	}
	// Right-to-left: enforce the right-neighbor rule symmetrically. Raising
	// only — never lowering — so these fixes cannot undo the first pass's
	// left-neighbor guarantees.
	for i := n - 2; i >= 0; i-- {
		if ratings[i] > ratings[i+1] {
			if candies[i+1]+1 > candies[i] {
				candies[i] = candies[i+1] + 1
			}
		}
	}
	total := int64(0)
	for _, value := range candies {
		total += int64(value)
	}
	return int(total)
}
