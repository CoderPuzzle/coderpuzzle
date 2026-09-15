// After the first k queries an index can reach zero exactly when the total
// val of the queries covering it is at least nums[i] — each index can
// spend every covering query's allowance independently, and extra queries
// never hurt, so feasibility is monotone in k. Binary search k; each probe
// folds the first k queries into a difference array and checks one prefix
// sweep, O(n + q). Coverage sums are bounded by q * val <= 5 * 10^5, well
// inside int.
func minZeroArray(nums []int, queries [][]int) int {
	feasible := func(k int) bool {
		delta := make([]int, len(nums)+1)
		for j := 0; j < k; j++ {
			delta[queries[j][0]] += queries[j][2]
			delta[queries[j][1]+1] -= queries[j][2]
		}
		cover := 0
		for i := 0; i < len(nums); i++ {
			cover += delta[i]
			if cover < nums[i] {
				return false
			}
		}
		return true
	}
	lo, hi := 0, len(queries)
	if !feasible(hi) {
		return -1
	}
	for lo < hi {
		mid := (lo + hi) / 2
		if feasible(mid) {
			hi = mid
		} else {
			lo = mid + 1
		}
	}
	return lo
}
