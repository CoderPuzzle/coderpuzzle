import "sort"

// Both sorted ascending, the least greedy unfed child faces the smallest
// unassigned cookie: the cheapest pairing worth trying.
func findContentChildren(g []int, s []int) int {
	sort.Ints(g)
	sort.Ints(s)
	child := 0
	for _, cookie := range s {
		// A cookie too small for the least greedy remaining child is too
		// small for everyone remaining — skip it. Otherwise feed it.
		if child < len(g) && cookie >= g[child] {
			child++
		}
	}
	return child
}
