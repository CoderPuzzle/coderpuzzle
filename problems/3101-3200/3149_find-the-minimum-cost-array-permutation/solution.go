func findPermutation(nums []int) []int {
	n := len(nums)
	full := (1 << n) - 1
	var INF int64 = 1 << 60

	abs := func(a int) int64 {
		if a < 0 {
			return int64(-a)
		}
		return int64(a)
	}

	// f[mask][last] = min additional cost to visit all elements not in mask,
	// starting from `last`, including the closing edge to nums[0]
	f := make([][]int64, 1<<n)
	for i := range f {
		f[i] = make([]int64, n)
		for j := range f[i] {
			f[i][j] = INF
		}
	}
	for last := 0; last < n; last++ {
		f[full][last] = abs(last - nums[0])
	}
	for mask := full - 1; mask >= 1; mask-- {
		for last := 0; last < n; last++ {
			if (mask>>uint(last))&1 == 0 {
				continue
			}
			best := INF
			for nxt := 0; nxt < n; nxt++ {
				if (mask>>uint(nxt))&1 != 0 {
					continue
				}
				cost := abs(last-nums[nxt]) + f[mask|(1<<uint(nxt))][nxt]
				if cost < best {
					best = cost
				}
			}
			f[mask][last] = best
		}
	}

	// greedy reconstruction: smallest next element keeping the cost optimal
	perm := []int{0}
	mask := 1
	last := 0
	for step := 1; step < n; step++ {
		for nxt := 0; nxt < n; nxt++ {
			if (mask>>uint(nxt))&1 != 0 {
				continue
			}
			if abs(last-nums[nxt])+f[mask|(1<<uint(nxt))][nxt] == f[mask][last] {
				perm = append(perm, nxt)
				mask |= 1 << uint(nxt)
				last = nxt
				break
			}
		}
	}
	return perm
}
