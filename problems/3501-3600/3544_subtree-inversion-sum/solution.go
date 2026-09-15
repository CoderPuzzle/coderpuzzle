func subtreeInversionSum(edges [][]int, nums []int, k int) int64 {
	n := len(nums)
	adj := make([][]int, n)
	for _, e := range edges {
		adj[e[0]] = append(adj[e[0]], e[1])
		adj[e[1]] = append(adj[e[1]], e[0])
	}

	// BFS from the root records each parent and an order whose reversal
	// lists children before parents, so the DP below needs no recursion.
	parent := make([]int, n)
	for i := range parent {
		parent[i] = -1
	}
	parent[0] = -2
	order := make([]int, 0, n)
	order = append(order, 0)
	for i := 0; i < len(order); i++ {
		u := order[i]
		for _, v := range adj[u] {
			if v != parent[u] {
				parent[v] = u
				order = append(order, v)
			}
		}
	}

	// dp[u][flip][d]: best subtree sum of u given the parity of sign flips
	// applied from ancestors and the edge distance d to the nearest inverted
	// ancestor, capped at k since any larger distance behaves identically.
	width := k + 1
	dp := make([][][]int64, n)
	for idx := n - 1; idx >= 0; idx-- {
		u := order[idx]
		// Children are already computed; pool their tables per (flip, distance).
		childSum := make([][]int64, 2)
		for f := range childSum {
			childSum[f] = make([]int64, width)
		}
		for _, v := range adj[u] {
			if v == parent[u] {
				continue
			}
			cv := dp[v]
			for flip := 0; flip < 2; flip++ {
				for d := 0; d < width; d++ {
					childSum[flip][d] += cv[flip][d]
				}
			}
		}

		// Not inverting: children observe distance+1 (capped at k). Once the
		// distance is >= k, inverting u is legal too: it flips the parity and
		// resets the child distance to 1; keep the better of the two options.
		table := make([][]int64, 2)
		for f := range table {
			table[f] = make([]int64, width)
		}
		for flip := 0; flip < 2; flip++ {
			s := int64(1)
			if flip == 1 {
				s = -1
			}
			baseDont := int64(nums[u]) * s
			baseInv := -int64(nums[u]) * s
			dontRow := childSum[flip]
			invRow := childSum[flip^1]
			for dist := 0; dist < width; dist++ {
				dd := dist + 1
				if dist >= k {
					dd = k
				}
				valDont := baseDont + dontRow[dd]
				if dist >= k {
					valInv := baseInv + invRow[1]
					if valInv > valDont {
						table[flip][dist] = valInv
					} else {
						table[flip][dist] = valDont
					}
				} else {
					table[flip][dist] = valDont
				}
			}
		}
		dp[u] = table
	}
	// The root has no recent inversion above it, so it is free to invert.
	return dp[0][0][k]
}
