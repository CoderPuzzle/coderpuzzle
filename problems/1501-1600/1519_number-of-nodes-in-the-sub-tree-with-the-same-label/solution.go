// Breadth-first order from the root, then a reverse pass: parents are
// always recorded before their children in the forward walk, so reading
// that order backwards visits every child before its parent -- an
// iterative post-order that never touches the call stack.
func countSubTrees(n int, edges [][]int, labels string) []int {
	adj := make([][]int, n)
	for _, e := range edges {
		a, b := e[0], e[1]
		adj[a] = append(adj[a], b)
		adj[b] = append(adj[b], a)
	}

	order := make([]int, n)
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	visited := make([]bool, n)
	visited[0] = true
	head, tail := 0, 1
	for head < tail {
		u := order[head]
		head++
		for _, v := range adj[u] {
			if !visited[v] {
				visited[v] = true
				parent[v] = u
				order[tail] = v
				tail++
			}
		}
	}

	// counts[i] tallies, per letter, how many nodes folded into i's
	// subtree so far carry that letter.
	counts := make([][26]int, n)
	for i := 0; i < n; i++ {
		counts[i][labels[i]-'a']++
	}

	// Reverse breadth-first order folds children into parents only after
	// every one of their own descendants has already folded in.
	for idx := n - 1; idx > 0; idx-- {
		u := order[idx]
		p := parent[u]
		for c := 0; c < 26; c++ {
			counts[p][c] += counts[u][c]
		}
	}

	ans := make([]int, n)
	for i := 0; i < n; i++ {
		ans[i] = counts[i][labels[i]-'a']
	}
	return ans
}
