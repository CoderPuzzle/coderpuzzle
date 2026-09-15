import "math"

// Every nut after the first is a tree -> nut -> tree round trip, so the
// unavoidable cost is 2 * dist(nut, tree) summed over all nuts. The only
// real choice is which nut to pick up first: starting with nut i replaces
// one round trip by squirrel -> nut -> tree, changing the total by
// dist(squirrel, nut_i) - dist(nut_i, tree), and the smallest change wins.
func minDistance(height int, width int, tree []int, squirrel []int, nuts [][]int) int {
	total := 0
	best := math.MaxInt
	for _, nut := range nuts {
		toTree := abs(nut[0]-tree[0]) + abs(nut[1]-tree[1])
		total += 2 * toTree
		detour := abs(nut[0]-squirrel[0]) + abs(nut[1]-squirrel[1]) - toTree
		best = min(best, detour)
	}
	return total + best
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
