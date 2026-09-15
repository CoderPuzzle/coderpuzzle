func countPaths(n int, edges [][]int) int64 {
	// sieve of primes up to n
	prime := make([]bool, n+1)
	for i := range prime {
		prime[i] = true
	}
	prime[0] = false
	if n >= 1 {
		prime[1] = false
	}
	for p := 2; p*p <= n; p++ {
		if prime[p] {
			for m := p * p; m <= n; m += p {
				prime[m] = false
			}
		}
	}

	graph := make([][]int, n+1)
	for _, e := range edges {
		graph[e[0]] = append(graph[e[0]], e[1])
		graph[e[1]] = append(graph[e[1]], e[0])
	}

	parent := make([]int, n+1)
	order := make([]int, 0, n)
	order = append(order, 1)
	for i := 0; i < len(order); i++ {
		x := order[i]
		for _, y := range graph[x] {
			if y != parent[x] {
				parent[y] = x
				order = append(order, y)
			}
		}
	}

	// dp0[x] / dp1[x] = number of nodes y in subtree(x) whose path x..y
	// contains 0 / exactly 1 prime node.
	dp0 := make([]int64, n+1)
	dp1 := make([]int64, n+1)
	var ans int64
	for i := len(order) - 1; i >= 0; i-- {
		x := order[i]
		if prime[x] {
			dp0[x] = 0
			dp1[x] = 1
		} else {
			dp0[x] = 1
			dp1[x] = 0
		}
		var total0, total1 int64
		if prime[x] {
			total0, total1 = 0, 1
		} else {
			total0, total1 = 1, 0
		}
		for _, y := range graph[x] {
			if parent[y] != x {
				continue
			}
			var c0, c1 int64
			if prime[x] {
				c0 = 0
				c1 = dp0[y]
			} else {
				c0 = dp0[y]
				c1 = dp1[y]
			}
			if prime[x] {
				// need f(a) + f(b) == 2 (both endpoints one prime)
				ans += total1 * c1
			} else {
				ans += total0*c1 + total1*c0
			}
			total0 += c0
			total1 += c1
			if prime[x] {
				dp1[x] += dp0[y]
			} else {
				dp0[x] += dp0[y]
				dp1[x] += dp1[y]
			}
		}
	}
	return ans
}
