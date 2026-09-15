func maxSumDivThree(nums []int) int {
	// best[r]: greatest prefix sum with sum % 3 == r (-1 = unreachable).
	const NEG = -1
	best := [3]int{0, NEG, NEG}
	for _, x := range nums {
		candidate := best
		for r := 0; r < 3; r++ {
			if best[r] != NEG {
				nr := (r + x) % 3
				if best[r]+x > candidate[nr] {
					candidate[nr] = best[r] + x
				}
			}
		}
		best = candidate
	}
	return best[0]
}
