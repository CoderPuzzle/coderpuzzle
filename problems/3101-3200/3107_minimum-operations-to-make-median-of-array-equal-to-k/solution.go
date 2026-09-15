import "sort"

// After sorting, the median slot is n/2: the middle element for odd n and
// the larger of the two middles for even n, matching the statement's
// definition. Elements left of the slot above k must come down to k;
// elements right of it below k must come up. The total reaches ~2*10**14
// at the constraint maximum, so the count lives in an int64.
func minOperationsToMakeMedianK(nums []int, k int) int64 {
	sort.Slice(nums, func(i, j int) bool { return nums[i] < nums[j] })
	mid := len(nums) / 2
	total := int64(abs(nums[mid] - k))
	for i := 0; i < mid; i++ {
		if nums[i] > k {
			total += int64(nums[i] - k)
		}
	}
	for i := mid + 1; i < len(nums); i++ {
		if nums[i] < k {
			total += int64(k - nums[i])
		}
	}
	return total
}

func abs(x int) int {
	if x < 0 {
		return -x
	}
	return x
}
