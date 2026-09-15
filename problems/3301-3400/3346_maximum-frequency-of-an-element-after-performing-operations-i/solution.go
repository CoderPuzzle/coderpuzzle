import "sort"

// A target v collects every element in [v-k, v+k]: elements already equal
// to v cost nothing, any other costs one operation, and surplus operations
// can always be spent as +0 elsewhere because numOperations <= n. So the
// best frequency at v is min(window(v), count(v) + numOperations).
// Elements are >= 1, so targets below 1 never beat v = 1, and targets
// above max+k see an empty window; a sliding window over every integer v
// in [1, max(nums)+k] therefore evaluates all candidates.
func maxFrequency(nums []int, k int, numOperations int) int {
	sort.Ints(nums)
	count := make(map[int]int)
	for _, x := range nums {
		count[x]++
	}
	best := 0
	lo, hi, n := 0, 0, len(nums)
	for v := 1; v <= nums[n-1]+k; v++ {
		for hi < n && nums[hi] <= v+k {
			hi++
		}
		for lo < hi && nums[lo] < v-k {
			lo++
		}
		best = max(best, min(hi-lo, count[v]+numOperations))
	}
	return best
}
