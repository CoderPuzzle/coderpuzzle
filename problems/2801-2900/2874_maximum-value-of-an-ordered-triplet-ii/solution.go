// prefix_max[i] is the largest value at or before i, suffix_max[i] the largest
// value at or after i, so any middle index j can look both ways.
func maximumTripletValue(nums []int) int64 {
	n := len(nums)
	prefix_max := make([]int64, n)
	prefix_max[0] = int64(nums[0])
	for i := 1; i < n; i++ {
		prefix_max[i] = max(prefix_max[i-1], int64(nums[i]))
	}
	suffix_max := make([]int64, n)
	suffix_max[n-1] = int64(nums[n-1])
	for i := n - 2; i >= 0; i-- {
		suffix_max[i] = max(suffix_max[i+1], int64(nums[i]))
	}

	// For a fixed middle j the best choice of i < j is prefix_max[j - 1] and
	// of k > j is suffix_max[j + 1]; the clamp keeps an all-negative answer at
	// 0. The product reaches ~10^12, past 32-bit range.
	var ans int64
	for j := 1; j+1 < n; j++ {
		ans = max(ans, (prefix_max[j-1]-int64(nums[j]))*suffix_max[j+1])
	}
	return ans
}
