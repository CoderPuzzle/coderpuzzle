import "sort"

func countStableSubarrays(nums []int, queries [][]int) []int64 {
	n := len(nums)
	// left[i] is the smallest start s such that nums[s..i] reads
	// non-decreasing; it only ever moves right, which the per-query
	// binary search below relies on.
	left := make([]int, n)
	prefLeft := make([]int64, n+1)
	prefBase := make([]int64, n+1)
	for i := 0; i < n; i++ {
		if i > 0 && nums[i] >= nums[i-1] {
			left[i] = left[i-1]
		} else {
			left[i] = i
		}
		// Stable subarrays ending at i inside their own run.
		prefLeft[i+1] = prefLeft[i] + int64(left[i])
		prefBase[i+1] = prefBase[i] + int64(i-left[i]+1)
	}
	result := make([]int64, len(queries))
	for qi, query := range queries {
		l, r := query[0], query[1]
		// First end whose run reaches back to l or earlier. Ends before it
		// sit past a drop at or after l and count their bare window
		// length; ends from there on count down to left[e].
		p := sort.SearchInts(left[l:r+1], l) + l
		result[qi] = prefBase[r+1] - prefBase[l] +
			prefLeft[p] - prefLeft[l] - int64(l)*int64(p-l)
	}
	return result
}
