func minimumCardPickup(cards []int) int {
	last := make(map[int]int)
	best := -1
	for i, v := range cards {
		if prev, ok := last[v]; ok {
			gap := i - prev + 1
			if best == -1 || gap < best {
				best = gap
			}
		}
		last[v] = i
	}
	return best
}
