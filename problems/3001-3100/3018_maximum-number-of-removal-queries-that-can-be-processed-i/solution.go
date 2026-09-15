func maximumProcessableQueries(nums []int, queries []int) int {
	n := len(nums)
	m := len(queries)
	// dp[l][r]: most queries processable while nums[l:r] all survive. The
	// window starts as the whole array and shrinks one index per step; a
	// leaving end either serves the next query in order or was dropped
	// silently by the once-only subsequence op.
	dp := make([][]int, n+1)
	for l := range dp {
		dp[l] = make([]int, n+1)
	}
	best := 0
	for span := n - 1; span >= 0; span-- {
		for l := 0; l+span <= n; l++ {
			r := l + span
			t := 0
			if l > 0 {
				p := dp[l-1][r]
				if p > t {
					t = p
				}
				if p < m && nums[l-1] >= queries[p] && p+1 > t {
					t = p + 1
				}
			}
			if r < n {
				p := dp[l][r+1]
				if p > t {
					t = p
				}
				if p < m && nums[r] >= queries[p] && p+1 > t {
					t = p + 1
				}
			}
			dp[l][r] = t
			// Every survivor block can be op-deleted too, so empty
			// windows carry the answer.
			if span == 0 && t > best {
				best = t
			}
		}
	}
	return best
}
