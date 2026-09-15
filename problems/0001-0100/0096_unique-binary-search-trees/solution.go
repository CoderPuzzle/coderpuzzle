// One table of shape counts, filled in order of node count: the root choice
// splits the values into a smaller left block and a larger right block, and
// g[k] sums the products of the two block counts over every split point.
func numTrees(n int) int {
	g := make([]int, n+1)
	g[0] = 1
	for nodes := 1; nodes <= n; nodes++ {
		for root := 1; root <= nodes; root++ {
			g[nodes] += g[root-1] * g[nodes-root]
		}
	}
	return g[n]
}
