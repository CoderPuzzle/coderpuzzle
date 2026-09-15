func minOperations(queries [][]int) int64 {
	// cost(x) = k for x in [4^(k-1), 4^k): one "/4" step per band. An
	// operation performs two steps, so a query with S total steps over
	// [l, r] needs ceil(S / 2) operations; sum the steps per band.
	stepsUpTo := func(v int64) int64 {
		var total int64
		low, k := int64(1), int64(1)
		for low <= v {
			high := low*4 - 1
			if v < high {
				high = v
			}
			total += k * (high - low + 1)
			low *= 4
			k++
		}
		return total
	}
	var ops int64
	for _, q := range queries {
		s := stepsUpTo(int64(q[1])) - stepsUpTo(int64(q[0])-1)
		ops += (s + 1) / 2
	}
	return ops
}
