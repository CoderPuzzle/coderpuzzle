func maxLen(n int, edges [][]int, label string) int {
	adj := make([][]int, n)
	for i := 0; i < n; i++ {
		adj[i] = make([]int, 0)
	}
	for _, e := range edges {
		u, v := e[0], e[1]
		adj[u] = append(adj[u], v)
		adj[v] = append(adj[v], u)
	}
	codes := make([]byte, n)
	for i := 0; i < n; i++ {
		codes[i] = label[i]
	}
	memo := make([]int8, (1<<uint(n))*n*n)
	for i := range memo {
		memo[i] = -1
	}

	popcount := func(x int) int {
		cnt := 0
		for x != 0 {
			x &= x - 1
			cnt++
		}
		return cnt
	}

	// dp(mask, left, right): best length reachable when mask is the visited
	// set and left/right are the path endpoints. Invariant: the visited
	// nodes spell a palindrome read from left to right.
	var dp func(mask, left, right int) int
	dp = func(mask, left, right int) int {
		idx := (mask*n+left)*n + right
		if memo[idx] >= 0 {
			return int(memo[idx])
		}
		// The standing path already spells a palindrome, so its length is
		// the floor every extension must beat.
		best := popcount(mask)
		// Grow outward by one matched pair: u glues onto the left end, v onto
		// the right end; they must be distinct, unvisited, and equally
		// labeled so the path stays palindromic.
		for _, u := range adj[left] {
			if (mask>>uint(u))&1 != 0 {
				continue
			}
			for _, v := range adj[right] {
				if u == v || (mask>>uint(v))&1 != 0 {
					continue
				}
				if codes[u] != codes[v] {
					continue
				}
				cand := dp(mask|(1<<uint(u))|(1<<uint(v)), u, v)
				if cand > best {
					best = cand
				}
			}
		}
		memo[idx] = int8(best)
		return best
	}

	// Every palindrome has a center: seed odd paths from each single node
	// and even paths from each equal-label adjacent pair.
	answer := 1
	for i := 0; i < n; i++ {
		length := dp(1<<uint(i), i, i)
		if length > answer {
			answer = length
		}
	}
	for _, e := range edges {
		u, v := e[0], e[1]
		if codes[u] == codes[v] {
			length := dp((1<<uint(u))|(1<<uint(v)), u, v)
			if length > answer {
				answer = length
			}
		}
	}
	return answer
}
