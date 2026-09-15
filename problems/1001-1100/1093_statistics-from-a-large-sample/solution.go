func sampleStats(count []int) []float64 {
	// One pass over the 256 buckets finds every statistic except the
	// median: min/max are the first/last nonzero buckets, the mode is the
	// largest count, and the mean needs the total count and the weighted
	// value sum (kept in 64-bit integers — counts reach 1e9).
	total := 0
	totalSum := 0
	first := -1
	last := -1
	mode := 0
	for i, c := range count {
		if c > 0 {
			if first == -1 {
				first = i
			}
			last = i
			if c > count[mode] {
				mode = i
			}
			total += c
			totalSum += i * c
		}
	}
	mean := float64(totalSum) / float64(total)
	// k-th smallest element (1-indexed), found by walking the buckets.
	kth := func(k int) int {
		acc := 0
		for i, c := range count {
			acc += c
			if acc >= k {
				return i
			}
		}
		return 0
	}
	var median float64
	if total%2 == 1 {
		median = float64(kth(total/2 + 1))
	} else {
		median = float64(kth(total/2)+kth(total/2+1)) / 2.0
	}
	return []float64{float64(first), float64(last), mean, median, float64(mode)}
}
