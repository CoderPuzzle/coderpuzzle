func twoSum(numbers []int, target int) []int {
	left, right := 0, len(numbers)-1
	for left < right {
		total := numbers[left] + numbers[right]
		switch {
		case total == target:
			// 1-based indices as the problem expects.
			return []int{left + 1, right + 1}
		case total < target:
			// Too small: pairing numbers[left] with anything smaller than
			// numbers[right] only lowers the sum — retire the left value.
			left++
		default:
			// Too large: retire the right value symmetrically.
			right--
		}
	}
	// Unreachable under the uniqueness promise; keeps the function total.
	return nil
}
