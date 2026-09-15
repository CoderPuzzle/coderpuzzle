import "sort"

// allGaps adds the immovable border fences at 1 and outer, then collects
// every pairwise difference of the positions — one surviving region width
// per pair.
func allGaps(outer int64, fences []int64) []int64 {
	xs := append(append([]int64{}, fences...), 1, outer)
	sort.Slice(xs, func(i, j int) bool { return xs[i] < xs[j] })
	seen := make(map[int64]bool)
	out := make([]int64, 0)
	for i := range xs {
		for j := i + 1; j < len(xs); j++ {
			d := xs[j] - xs[i]
			if !seen[d] {
				seen[d] = true
				out = append(out, d)
			}
		}
	}
	return out
}

func maximizeSquareArea(m int64, n int64, hFences []int64, vFences []int64) int64 {
	hSet := make(map[int64]bool)
	for _, d := range allGaps(m, hFences) {
		hSet[d] = true
	}
	best := int64(-1)
	for _, d := range allGaps(n, vFences) {
		if d > best && hSet[d] {
			best = d
		}
	}
	// best <= 10^9 - 1, so the square fits in 64 bits before the modulo.
	if best < 0 {
		return -1
	}
	return best * best % 1000000007
}
