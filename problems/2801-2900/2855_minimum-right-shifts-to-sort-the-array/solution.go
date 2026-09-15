func minimumRightShifts(nums []int) int {
	n := len(nums)
	descents := 0
	pivot := -1
	for i := 0; i < n; i++ {
		next := (i + 1) % n
		if nums[i] > nums[next] {
			descents++
			pivot = i
		}
	}
	if descents == 0 {
		return 0
	}
	if descents > 1 {
		return -1
	}
	return n - 1 - pivot
}
