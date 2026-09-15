// One sweep carrying a run counter: any adjacent pair is a valid Fibonacci
// array, so runs start at length 2; each later element extends the run when
// it equals the sum of the two before it and snaps the counter back to 2
// when it does not. The sum is taken in int64: two elements reach 2e9, at
// the edge of int32 range.
func longestSubarray(nums []int) int {
	best := 2
	current := 2
	for i := 2; i < len(nums); i++ {
		sum := int64(nums[i-1]) + int64(nums[i-2])
		if sum == int64(nums[i]) {
			current++
		} else {
			current = 2
		}
		if current > best {
			best = current
		}
	}
	return best
}
