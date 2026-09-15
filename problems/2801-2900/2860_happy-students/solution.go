import "sort"

func countWays(nums []int) int {
	// A size-k group exists exactly when k values lie strictly below k and
	// none equals k, so each candidate size is two comparisons on the
	// sorted copy. Values satisfy 0 <= nums[i] < n and the answer is at
	// most n + 1 <= 100001, far inside int range.
	values := append([]int(nil), nums...)
	sort.Ints(values)
	n := len(values)
	ways := 0
	for k := 0; k <= n; k++ {
		if (k == 0 || values[k-1] < k) && (k == n || values[k] > k) {
			ways++
		}
	}
	return ways
}
