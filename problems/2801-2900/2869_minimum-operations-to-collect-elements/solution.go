// Operations only ever drop the last element, so after t operations the
// collection is exactly the suffix of length t.
func minOperations(nums []int, k int) int {
	marked := make([]bool, k+1)
	collected := 0
	for i := len(nums) - 1; i >= 0; i-- {
		if nums[i] <= k && !marked[nums[i]] {
			marked[nums[i]] = true
			collected++
			if collected == k {
				// The wanted values 1..k all sit in the removed suffix.
				return len(nums) - i
			}
		}
	}
	// Unreachable for valid inputs: 1..k is guaranteed collectible.
	return len(nums)
}
