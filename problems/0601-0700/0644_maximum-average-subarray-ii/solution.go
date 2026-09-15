func findMaxAverage(nums []int, k int) float64 {
	n := len(nums)
	// prefix[i] = sum of nums[:i]
	prefix := make([]int64, n+1)
	for i, x := range nums {
		prefix[i+1] = prefix[i] + int64(x)
	}
	// Exact comparison of averages via cross-multiplication:
	// s1/l1 > s2/l2  <=>  s1*l2 > s2*l1  (positive lengths).
	var bestSum int64
	bestLen := 0
	for length := k; length <= n; length++ {
		s := int64(-1) << 62
		for t := 0; t+length <= n; t++ {
			v := prefix[t+length] - prefix[t]
			if v > s {
				s = v
			}
		}
		if bestLen == 0 || s*int64(bestLen) > bestSum*int64(length) {
			bestSum = s
			bestLen = length
		}
	}
	return float64(bestSum) / float64(bestLen)
}
