import (
	"sort"
)

func minPairSum(nums []int) int64 {
	// Pair sorted extremes: nums[i] with nums[n-1-i]. An exchange
	// argument shows this minimizes the largest pair sum.
	sort.Ints(nums)
	n := len(nums)
	var best int64
	for i := 0; i+i < n; i++ {
		if s := int64(nums[i]) + int64(nums[n-1-i]); s > best {
			best = s
		}
	}
	return best
}
