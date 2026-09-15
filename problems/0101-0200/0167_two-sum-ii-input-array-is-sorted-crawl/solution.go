// Sorted order lets two indexes converge from both ends: the smallest and
// largest remaining values stand in for every candidate pair, and no extra
// storage is needed, as the statement demands.
func twoSum(numbers []int, target int) []int {
	low, high := 0, len(numbers)-1
	for low < high {
		total := numbers[low] + numbers[high]
		if total == target {
			// The statement's contract is 1-indexed.
			return []int{low + 1, high + 1}
		} else if total < target {
			// Too small: only a larger low value can help, so advance low.
			low++
		} else {
			// Too large: only a smaller high value can help, so retreat high.
			high--
		}
	}
	return nil
}
