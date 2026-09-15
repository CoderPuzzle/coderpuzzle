// Sieve from the smallest element index: the first occurrence of each value
// claims every multiple it divides, so each group size reads off the earliest
// qualifying element index.
func assignElements(groups []int, elements []int) []int {
	const limit = 100001
	best := make([]int, limit)
	for i := range best {
		best[i] = -1
	}
	seen := make([]bool, limit)
	for index, value := range elements {
		if seen[value] {
			continue
		}
		seen[value] = true
		for multiple := value; multiple < limit; multiple += value {
			if best[multiple] == -1 {
				best[multiple] = index
			}
		}
	}
	assigned := make([]int, len(groups))
	for i, size := range groups {
		assigned[i] = best[size]
	}
	return assigned
}
