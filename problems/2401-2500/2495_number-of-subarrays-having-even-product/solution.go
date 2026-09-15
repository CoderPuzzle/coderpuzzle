// A subarray has an even product iff it contains at least one even element.
// Sweep the right endpoint left to right, remembering the most recent even
// element's index: every left endpoint up to and including it contributes
// lastEven + 1 even-product subarrays ending here.
func evenProduct(nums []int) int64 {
	answer := int64(0)
	lastEven := -1
	for i, x := range nums {
		if x%2 == 0 {
			lastEven = i
		}
		answer += int64(lastEven + 1)
	}
	return answer
}
