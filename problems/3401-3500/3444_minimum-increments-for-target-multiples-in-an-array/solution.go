func minimumIncrements(nums []int, target []int) int {
	// An optimal plan serves each group of targets with a single element
	// (a multiple of the group's lcm), so it uses at most m elements in
	// total, and an exchange argument keeps every group's element among
	// the m cheapest servants of that group — the dp below only sweeps
	// those few candidates. Subsets whose lcm exceeds CAP are skipped:
	// serving such a subset with one element costs more than serving its
	// targets separately ever can, and the lcm fold stays below 10^9.
	n := len(nums)
	m := len(target)
	full := 1<<m - 1
	const capLimit = 100000
	const inf = 1e15
	lcms := make([]int, full+1)
	lcms[0] = 1
	for mask := 1; mask <= full; mask++ {
		low := mask & -mask
		l := lcms[mask^low]
		idx := 0
		for b := low; b > 1; b >>= 1 {
			idx++
		}
		t := target[idx]
		l = l / gcd(l, t) * t
		if l <= capLimit {
			lcms[mask] = l
		}
	}
	cand := make([]bool, n)
	bestCost := make([]int, m)
	bestIdx := make([]int, m)
	for sub := 1; sub <= full; sub++ {
		l := lcms[sub]
		if l == 0 {
			continue
		}
		for r := range bestCost {
			bestCost[r] = inf
			bestIdx[r] = -1
		}
		for i, x := range nums {
			cost := (l - x%l) % l
			if cost >= bestCost[m-1] {
				continue
			}
			r := m - 1
			for r > 0 && bestCost[r-1] > cost {
				bestCost[r] = bestCost[r-1]
				bestIdx[r] = bestIdx[r-1]
				r--
			}
			bestCost[r] = cost
			bestIdx[r] = i
		}
		for _, idx := range bestIdx {
			if idx >= 0 {
				cand[idx] = true
			}
		}
	}
	dp := make([]int, full+1)
	ndp := make([]int, full+1)
	for i := 1; i <= full; i++ {
		dp[i] = inf
	}
	dp[0] = 0
	for i, x := range nums {
		if !cand[i] {
			continue
		}
		copy(ndp, dp)
		for mask := 0; mask <= full; mask++ {
			base := dp[mask]
			if base >= inf {
				continue
			}
			comp := full ^ mask
			for sub := comp; sub != 0; sub = (sub - 1) & comp {
				l := lcms[sub]
				if l == 0 {
					continue
				}
				if c := base + (l-x%l)%l; c < ndp[mask|sub] {
					ndp[mask|sub] = c
				}
			}
		}
		dp, ndp = ndp, dp
	}
	return dp[full]
}

func gcd(a, b int) int {
	for b != 0 {
		a, b = b, a%b
	}
	return a
}
