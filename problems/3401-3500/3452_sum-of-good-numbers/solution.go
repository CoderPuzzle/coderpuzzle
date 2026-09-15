// One sweep: an element is good when it strictly beats the neighbors
// that exist at distance k; a missing neighbor never blocks it.
func sumOfGoodNumbers(nums []int, k int) int {
	n := len(nums)
	total := 0
	for i := 0; i < n; i++ {
		leftOk := i-k < 0 || nums[i] > nums[i-k]
		rightOk := i+k >= n || nums[i] > nums[i+k]
		if leftOk && rightOk {
			total += nums[i]
		}
	}
	return total
}
