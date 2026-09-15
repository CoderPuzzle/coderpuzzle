// Only each array's first and last elements can sit in an optimal pair, so
// one sweep holding the smallest first and the largest last of the arrays
// already seen answers everything. Each new array tries both of its ends
// against those running extremes — a pairing that always spans two different
// arrays — and only afterwards folds its own ends in, which keeps the global
// minimum and maximum from being paired inside a single array.
func maxDistance(arrays [][]int) int {
	best := 0
	lo, hi := arrays[0][0], arrays[0][len(arrays[0])-1]
	for _, arr := range arrays[1:] {
		first, last := arr[0], arr[len(arr)-1]
		best = max(best, abs(first-hi), abs(last-lo))
		lo = min(lo, first)
		hi = max(hi, last)
	}
	return best
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
