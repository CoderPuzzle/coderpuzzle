func minimumIndex(capacity []int, itemSize int) int {
	// The earliest index wins ties, so only a strictly smaller
	// fitting capacity replaces the current best.
	bestIndex := -1
	bestCapacity := 1 << 30
	for i, c := range capacity {
		if c >= itemSize && c < bestCapacity {
			bestCapacity = c
			bestIndex = i
		}
	}
	return bestIndex
}
