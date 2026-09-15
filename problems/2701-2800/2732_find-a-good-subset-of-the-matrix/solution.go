func goodSubsetofBinaryMatrix(grid [][]int) []int {
	// Each row collapses into an n-bit signature (n <= 5 means at most
	// 32 of them). An all-zero row by itself is a good subset; otherwise
	// the earliest previously stored signature disjoint from the current
	// row completes a size-2 good subset.
	seen := map[int]int{}
	for i, row := range grid {
		mask := 0
		for j, value := range row {
			if value == 1 {
				mask |= 1 << j
			}
		}
		if mask == 0 {
			return []int{i}
		}
		for other := 0; other < 32; other++ {
			if first, ok := seen[other]; ok && other&mask == 0 {
				return []int{first, i}
			}
		}
		if _, ok := seen[mask]; !ok {
			seen[mask] = i
		}
	}
	return []int{}
}
