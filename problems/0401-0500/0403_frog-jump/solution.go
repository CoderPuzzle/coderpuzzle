func canCross(stones []int64) bool {
	n := len(stones)
	index := make(map[int64]int, n)
	for i, pos := range stones {
		index[pos] = i
	}
	// jumps[i] = set of last-jump sizes that can land on stone i
	jumps := make([]map[int64]bool, n)
	for i := range jumps {
		jumps[i] = make(map[int64]bool)
	}
	jumps[0][0] = true
	for i := 0; i < n; i++ {
		for last := range jumps[i] {
			for _, step := range []int64{last - 1, last, last + 1} {
				if step <= 0 {
					continue
				}
				target := stones[i] + step
				if j, ok := index[target]; ok && j > i {
					jumps[j][step] = true
				}
			}
		}
	}
	return len(jumps[n-1]) > 0
}
