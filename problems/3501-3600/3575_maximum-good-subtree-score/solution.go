import "strconv"

func goodSubtreeSum(vals []int, par []int) int {
	const MOD = 1000000007
	const NEG = -(1 << 60)

	n := len(vals)
	children := make([][]int, n)
	for i := 1; i < n; i++ {
		children[par[i]] = append(children[par[i]], i)
	}

	umask := make([]int, n)
	selectable := make([]bool, n)
	for i, v := range vals {
		mask := 0
		seen := [10]bool{}
		distinct := true
		for _, ch := range []byte(strconv.Itoa(v)) {
			d := int(ch - '0')
			if seen[d] {
				distinct = false
			}
			seen[d] = true
			mask |= 1 << d
		}
		umask[i] = mask
		selectable[i] = distinct
	}

	subsetConvolve := func(a, b []int64) []int64 {
		// res[c] = max over x subset of c of a[x] + b[c^x]
		res := make([]int64, 1024)
		for c := 0; c < 1024; c++ {
			best := int64(NEG)
			x := c
			for {
				y := c ^ x
				v := a[x] + b[y]
				if v > best {
					best = v
				}
				if x == 0 {
					break
				}
				x = (x - 1) & c
			}
			res[c] = best
		}
		return res
	}

	// post-order
	order := make([]int, 0, n)
	stack := []int{0}
	for len(stack) > 0 {
		u := stack[len(stack)-1]
		stack = stack[:len(stack)-1]
		order = append(order, u)
		stack = append(stack, children[u]...)
	}

	dp := make([][]int64, n)
	var total int64
	for idx := n - 1; idx >= 0; idx-- {
		u := order[idx]
		comb := make([]int64, 1024)
		for i := range comb {
			comb[i] = NEG
		}
		comb[0] = 0
		for _, c := range children[u] {
			comb = subsetConvolve(comb, dp[c])
		}

		du := make([]int64, 1024)
		copy(du, comb)
		if selectable[u] {
			mu := umask[u]
			for mask := 0; mask < 1024; mask++ {
				if mask&mu == mu {
					rest := mask ^ mu
					if comb[rest] != NEG {
						val := comb[rest] + int64(vals[u])
						if val > du[mask] {
							du[mask] = val
						}
					}
				}
			}
		}
		dp[u] = du
		best := du[0]
		for m := 1; m < 1024; m++ {
			if du[m] > best {
				best = du[m]
			}
		}
		total += best
	}
	return int(total % MOD)
}
