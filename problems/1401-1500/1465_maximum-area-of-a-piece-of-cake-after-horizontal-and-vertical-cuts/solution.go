import "sort"

func maxArea(h int64, w int64, horizontalCuts []int64, verticalCuts []int64) int64 {
	const MOD = 1_000_000_007
	maxH := widest(h, horizontalCuts)
	maxW := widest(w, verticalCuts)
	return maxH % MOD * (maxW % MOD) % MOD
}

func widest(length int64, cuts []int64) int64 {
	sort.Slice(cuts, func(i, j int) bool { return cuts[i] < cuts[j] })
	best := cuts[0]
	if edge := length - cuts[len(cuts)-1]; edge > best {
		best = edge
	}
	for i := 1; i < len(cuts); i++ {
		if gap := cuts[i] - cuts[i-1]; gap > best {
			best = gap
		}
	}
	return best
}
