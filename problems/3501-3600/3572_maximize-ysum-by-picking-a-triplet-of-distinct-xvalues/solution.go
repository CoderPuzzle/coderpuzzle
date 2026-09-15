// Per-x maxima + top-3 selection: each x-value can enter the triplet at
// most once, so only its best y matters.
func maxSumDistinctTriplet(x []int, y []int) int {
	best := make(map[int]int)
	for i := range x {
		if v, ok := best[x[i]]; !ok || y[i] > v {
			best[x[i]] = y[i]
		}
	}
	if len(best) < 3 {
		return -1
	}
	// The answer is the sum of the three largest per-x maxima.
	top := [3]int{}
	for _, v := range best {
		if v > top[0] {
			top = [3]int{v, top[0], top[1]}
		} else if v > top[1] {
			top = [3]int{top[0], v, top[1]}
		} else if v > top[2] {
			top[2] = v
		}
	}
	return top[0] + top[1] + top[2]
}
