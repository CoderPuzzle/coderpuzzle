func minimumMoves(nums []int, k int, maxChanges int) int64 {
	n := len(nums)
	// 1-indexed positions of ones
	ones := make([]int64, 0, n+1)
	prefix := make([]int64, 0, n+1)
	ones = append(ones, 0)
	prefix = append(prefix, 0)
	for i, v := range nums {
		if v != 0 {
			ones = append(ones, int64(i))
			prefix = append(prefix, prefix[len(prefix)-1]+int64(i))
		}
	}
	m := len(ones) - 1
	var INF int64 = 1 << 60

	windowCost := func(t int) int64 {
		if t == 0 {
			return 0
		}
		if t > m {
			return INF
		}
		best := INF
		for l := 1; l <= m-t+1; l++ {
			r := l + t - 1
			pos := (l + r) / 2
			leftCnt := int64(pos - l)
			rightCnt := int64(r - pos)
			left := leftCnt*ones[pos] - (prefix[pos-1] - prefix[l-1])
			right := (prefix[r] - prefix[pos]) - rightCnt*ones[pos]
			cost := left + right
			if cost < best {
				best = cost
			}
		}
		return best
	}

	total := func(t int) int64 {
		wc := windowCost(t)
		if wc == INF {
			return INF
		}
		return wc + 2*int64(k-t)
	}

	lo := k - maxChanges
	if lo < 0 {
		lo = 0
	}
	hi := k
	if hi > m {
		hi = m
	}
	if lo > hi {
		return 0
	}
	for hi-lo > 4 {
		m1 := lo + (hi-lo)/3
		m2 := hi - (hi-lo)/3
		if total(m1) <= total(m2) {
			hi = m2
		} else {
			lo = m1
		}
	}
	ans := INF
	for t := lo; t <= hi; t++ {
		v := total(t)
		if v < ans {
			ans = v
		}
	}
	return ans
}
