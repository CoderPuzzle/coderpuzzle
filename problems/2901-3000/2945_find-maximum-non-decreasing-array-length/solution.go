// Every reachable array is nums cut into contiguous blocks holding block
// sums. dp[i] is the most blocks over the first i elements and last[i] the
// smallest final-block sum among those partitions. A block (j, i] extends
// partition j when pre[i] - pre[j] >= last[j]. dp never decreases (the
// previous partition survives merging its final block with the new
// element), so the best predecessor is the rightmost valid one: keep
// predecessors on a frontier ordered by pre[j] + last[j], pop entries a
// later index dominates, and binary-search the largest key <= pre[i].
// Prefix sums reach 10^10, so the running totals are 64-bit.
func findMaximumLength(nums []int) int {
	n := len(nums)
	pre := make([]int64, n+1)
	for i, x := range nums {
		pre[i+1] = pre[i] + int64(x)
	}
	dp := make([]int, n+1)
	last := make([]int64, n+1)
	stack := make([]int, 1, n+1)
	keys := make([]int64, 1, n+1)
	for i := 1; i <= n; i++ {
		lo, hi := 0, len(keys)-1
		for lo < hi {
			mid := (lo + hi + 1) / 2
			if keys[mid] <= pre[i] {
				lo = mid
			} else {
				hi = mid - 1
			}
		}
		j := stack[lo]
		dp[i] = dp[j] + 1
		last[i] = pre[i] - pre[j]
		key := pre[i] + last[i]
		for dp[stack[len(stack)-1]] <= dp[i] && keys[len(keys)-1] >= key {
			stack = stack[:len(stack)-1]
			keys = keys[:len(keys)-1]
		}
		stack = append(stack, i)
		keys = append(keys, key)
	}
	return dp[n]
}
