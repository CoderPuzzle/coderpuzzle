func maxSum(nums []int, k int, m int) int {
	const NEG = int64(-1) << 60 // sentinel far below any reachable value
	n := len(nums)
	prefix := make([]int64, n+1)
	for i := 0; i < n; i++ {
		prefix[i+1] = prefix[i] + int64(nums[i])
	}
	// dp over rows: prev[j] = best sum of (i-1) subarrays within first j elements
	prev := make([]int64, n+1) // i = 0, all zeros
	for round := 1; round <= k; round++ {
		cur := make([]int64, n+1)
		for j := range cur {
			cur[j] = NEG
		}
		best := NEG // running max of prev[t] - prefix[t] for t <= j - m
		for j := 1; j <= n; j++ {
			t := j - m
			if t >= 0 {
				cand := prev[t] - prefix[t]
				if cand > best {
					best = cand
				}
			}
			if best != NEG {
				val := prefix[j] + best
				if cur[j-1] > val {
					cur[j] = cur[j-1]
				} else {
					cur[j] = val
				}
			} else {
				cur[j] = cur[j-1]
			}
		}
		prev = cur
	}
	return int(prev[n])
}
