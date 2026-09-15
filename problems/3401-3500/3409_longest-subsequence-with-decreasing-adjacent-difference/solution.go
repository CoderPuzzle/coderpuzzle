// E[x][d]: longest subsequence over processed prefixes ending with value x,
// whose last adjacent difference is >= d (suffix max over d).
func longestSubsequence(nums []int) int {
	maxV := 300
	E := make([][]int, maxV+1)
	for x := range E {
		E[x] = make([]int, maxV)
	}
	ans := 1
	for _, v := range nums {
		// Exact-difference lengths ending here: a predecessor with new
		// difference d must sit at value v-d or v+d, and its own last
		// difference must be >= d — exactly what E[..][d] stores.
		lens := make([]int, maxV)
		for d := 0; d < maxV; d++ {
			cand := 0
			if v-d >= 1 {
				cand = E[v-d][d]
			}
			if v+d <= maxV && E[v+d][d] > cand {
				cand = E[v+d][d]
			}
			lens[d] = cand + 1
		}
		// Merge the suffix max of those lengths back into row v; lens
		// entries are already >= 1, covering the singleton [v].
		row := E[v]
		run := 0
		for d := maxV - 1; d >= 0; d-- {
			if lens[d] > run {
				run = lens[d]
			}
			if run > row[d] {
				row[d] = run
			}
		}
		if row[0] > ans {
			ans = row[0]
		}
	}
	return ans
}
