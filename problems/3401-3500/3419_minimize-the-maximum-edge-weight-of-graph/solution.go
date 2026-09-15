func minMaxWeight(n int, edges [][]int, threshold int) int {
	// Invert: "0 reachable from all" becomes "0 reaches all" in rev.
	type pair struct {
		to int
		w  int
	}
	adj := make([][]pair, n)
	maxw := 0
	for _, e := range edges {
		adj[e[1]] = append(adj[e[1]], pair{e[0], e[2]})
		if e[2] > maxw {
			maxw = e[2]
		}
	}

	seen := make([]bool, n)
	stack := make([]int, n)
	reachable := func(limit int) bool {
		for i := range seen {
			seen[i] = false
		}
		seen[0] = true
		sp := 0
		count := 1
		stack[sp] = 0
		sp++
		for sp > 0 {
			sp--
			x := stack[sp]
			for _, p := range adj[x] {
				if !seen[p.to] && p.w <= limit {
					seen[p.to] = true
					count++
					stack[sp] = p.to
					sp++
				}
			}
		}
		return count == n
	}

	if !reachable(maxw) {
		return -1
	}
	lo, hi := 0, maxw
	for lo < hi {
		mid := lo + (hi-lo)/2
		if reachable(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
