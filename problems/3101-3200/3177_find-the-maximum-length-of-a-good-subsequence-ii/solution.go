func maximumLength(nums []int, k int) int {
	// remap values to compact ids
	mapping := make(map[int]int)
	remapped := make([]int, len(nums))
	for i, x := range nums {
		if _, ok := mapping[x]; !ok {
			mapping[x] = len(mapping)
		}
		remapped[i] = mapping[x]
	}
	V := len(mapping)

	// dp[j][x] = max length of a good subsequence ending with value x
	// having exactly j transitions
	dp := make([][]int, k+1)
	for j := range dp {
		dp[j] = make([]int, V)
	}
	best1 := make([]int, k+1) // max over x of dp[j][x]
	val1 := make([]int, k+1)  // argmax
	best2 := make([]int, k+1) // second max over x != val1
	for j := range val1 {
		val1[j] = -1
	}

	for _, x := range remapped {
		cand := make([]int, k+1)
		for j := 0; j <= k; j++ {
			c := dp[j][x] + 1 // extend a same-value subsequence
			if j > 0 {
				top := best2[j-1]
				if val1[j-1] != x {
					top = best1[j-1]
				}
				diff := top + 1 // append after a different value
				if diff > c {
					c = diff
				}
			}
			if j == 0 && 1 > c {
				c = 1
			}
			cand[j] = c
		}
		for j := 0; j <= k; j++ {
			nv := cand[j]
			if nv <= dp[j][x] {
				continue
			}
			dp[j][x] = nv
			if val1[j] == x {
				best1[j] = nv
			} else {
				if nv > best1[j] {
					best2[j] = best1[j]
					best1[j] = nv
					val1[j] = x
				} else if nv > best2[j] {
					best2[j] = nv
				}
			}
		}
	}

	ans := 0
	for j := 0; j <= k; j++ {
		if best1[j] > ans {
			ans = best1[j]
		}
	}
	return ans
}
