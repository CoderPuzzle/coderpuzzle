// Reaching position i costs no more than the cheapest swap among people 0..i:
// swap into the cheapest position, then every later position (being behind
// you) is free.
func minCosts(cost []int) []int {
	ans := make([]int, 0, len(cost))
	best := cost[0]
	for _, value := range cost {
		if value < best {
			best = value
		}
		ans = append(ans, best)
	}
	return ans
}
