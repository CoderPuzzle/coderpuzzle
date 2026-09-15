// Even indices add, odd indices subtract: walk the array two positions at
// a time, adding each even-index element and subtracting the odd-index
// partner that follows it. A trailing element at the last even index has
// no partner to subtract.
func alternatingSum(nums []int) int {
	total := 0
	for i := 0; i < len(nums); i += 2 {
		total += nums[i]
		if i+1 < len(nums) {
			total -= nums[i+1]
		}
	}
	return total
}
