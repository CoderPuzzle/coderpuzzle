func createTargetArray(nums []int, index []int) []int {
	// Direct simulation: each step splices nums[i] into the growing slice
	// at position index[i], pushing the tail right. index[i] <= i keeps
	// every insertion inside the array built so far.
	target := make([]int, 0, len(nums))
	for i, position := range index {
		target = append(target, 0)
		copy(target[position+1:], target[position:])
		target[position] = nums[i]
	}
	return target
}
