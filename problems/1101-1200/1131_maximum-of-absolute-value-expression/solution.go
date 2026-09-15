func maxAbsValExpr(arr1 []int, arr2 []int) int {
	// |A|+|B|+|C| = max over sign triples of s1*A + s2*B + s3*C, so the best
	// pair distance is the widest span of one of 8 projections.
	best := -1 << 30
	for _, s1 := range [2]int{1, -1} {
		for _, s2 := range [2]int{1, -1} {
			for _, s3 := range [2]int{1, -1} {
				high := s1*arr1[0] + s2*arr2[0]
				low := high
				for k := 0; k < len(arr1); k++ {
					value := s1*arr1[k] + s2*arr2[k] + s3*k
					if value > high {
						high = value
					} else if value < low {
						low = value
					}
				}
				if high-low > best {
					best = high - low
				}
			}
		}
	}
	return best
}
