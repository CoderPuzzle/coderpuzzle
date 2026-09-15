func moveZeroes(nums []int) []int {
	// Invariant: nums[:write] is the stabilized prefix of non-zero values in
	// their original order. write never passes the read position, so
	// copying forward cannot clobber an unread value.
	write := 0
	for _, value := range nums {
		if value != 0 {
			nums[write] = value
			write++
		}
	}
	// Slots from write onward are settled by decree rather than by
	// exchange: overwrite the whole tail with zeros.
	for index := write; index < len(nums); index++ {
		nums[index] = 0
	}
	return nums
}
