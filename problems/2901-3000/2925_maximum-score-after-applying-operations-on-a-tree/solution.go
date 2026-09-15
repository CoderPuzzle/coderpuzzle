// A tree stays healthy exactly when every root-to-leaf path keeps at least
// one un-taken node. dp[x] is the best score inside x's subtree while every
// x-to-leaf path must still keep a node: keep x (its value stays, so every
// descendant is free to take: the child subtree sums) or take x and let
// each child subtree solve the same problem (dp of the children). A leaf
// must keep itself, so its dp is 0. The answer is dp[0]. n reaches 2 * 10^4
// on path-shaped trees, so the two walks run on explicit arrays, never on
// the call stack.
func maximumScoreAfterOperations(edges [][]int, values []int) int64 {
	n := len(values)
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}
	parent := make([]int, n)
	hasChild := make([]bool, n)
	for i := range parent {
		parent[i] = -1
	}
	order := []int{0}
	parent[0] = 0
	for head := 0; head < len(order); head++ {
		x := order[head]
		for _, y := range adj[x] {
			if parent[y] == -1 {
				parent[y] = x
				hasChild[x] = true
				order = append(order, y)
			}
		}
	}
	subSum := make([]int64, n)
	dp := make([]int64, n)
	for i := len(order) - 1; i >= 0; i-- {
		x := order[i]
		here := int64(values[x]) + subSum[x]
		if hasChild[x] {
			taken := int64(values[x]) + dp[x]
			if freed := here - int64(values[x]); freed > taken {
				taken = freed
			}
			dp[x] = taken
		}
		subSum[x] = here
		if x != 0 {
			subSum[parent[x]] += here
			dp[parent[x]] += dp[x]
		}
	}
	return dp[0]
}
