// dp[r] = min cost to split the first r elements. For each r, sweep l
// downward from r-1 while extending one frequency table: a value seen for
// the first time adds nothing, its second occurrence adds 2 to the trimmed
// length (the missed first occurrence plus this one), later ones add 1
// each. Costs reach n*(k+n) ~ 10^12 — int64 throughout.
func minCost(nums []int, k int) int64 {
	n := len(nums)
	const inf = int64(^uint64(0) >> 1)
	dp := make([]int64, n+1)
	for i := 1; i <= n; i++ {
		dp[i] = inf
	}
	for r := 1; r <= n; r++ {
		freq := make(map[int]int)
		trimmed := int64(0)
		best := inf
		for l := r - 1; l >= 0; l-- {
			freq[nums[l]]++
			count := freq[nums[l]]
			if count == 2 {
				trimmed += 2
			} else if count > 2 {
				trimmed++
			}
			if cand := dp[l] + int64(k) + trimmed; cand < best {
				best = cand
			}
		}
		dp[r] = best
	}
	return dp[n]
}
