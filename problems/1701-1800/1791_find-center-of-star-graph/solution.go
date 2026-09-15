// The center lies on every edge, so it is the one node shared by the first
// two edges; every other node occurs in exactly one edge.
func findCenter(edges [][]int) int {
	a, b := edges[0][0], edges[0][1]
	c, d := edges[1][0], edges[1][1]
	if a == c || a == d {
		return a
	}
	return b
}
