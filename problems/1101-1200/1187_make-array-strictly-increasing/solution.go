import "sort"

func makeArrayIncreasing(arr1 []int, arr2 []int) int {
	b := append([]int(nil), arr2...)
	sort.Ints(b)
	m := 0
	for _, v := range b {
		if m == 0 || v != b[m-1] {
			b[m] = v
			m++
		}
	}
	b = b[:m]

	// bisectRight returns the index of the first element > key.
	bisectRight := func(key int) int {
		return sort.Search(m, func(i int) bool { return b[i] > key })
	}

	// dp: strictly increasing prefix whose last value is v -> min ops.
	// keeping arr1[0] costs 0; any smaller replacement costs 1 (larger
	// replacements are dominated by keeping)
	dp := map[int]int{arr1[0]: 0}
	for _, v := range b {
		if v < arr1[0] {
			dp[v] = 1
		}
	}

	for i := 1; i < len(arr1); i++ {
		ndp := make(map[int]int)
		for last, ops := range dp {
			// keep arr1[i] when it strictly exceeds last: no cost
			if arr1[i] > last {
				if cur, ok := ndp[arr1[i]]; !ok || cur > ops {
					ndp[arr1[i]] = ops
				}
			}
			// replace with the smallest arr2 value > last: the smallest
			// choice leaves the most room for what follows; costs 1 op
			idx := bisectRight(last)
			if idx < m {
				v := b[idx]
				cost := ops + 1
				if cur, ok := ndp[v]; !ok || cur > cost {
					ndp[v] = cost
				}
			}
		}
		dp = ndp
		// no state survives: a strictly increasing arrangement is impossible
		if len(dp) == 0 {
			return -1
		}
	}

	best := int(^uint(0) >> 1)
	for _, ops := range dp {
		if ops < best {
			best = ops
		}
	}
	return best
}
