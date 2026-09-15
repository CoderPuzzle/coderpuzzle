func longestSubarray(nums []int) int {
	best := 0
	left := 0
	zeros := 0
	for right, value := range nums {
		if value == 0 {
			zeros++
		}
		for zeros > 1 {
			if nums[left] == 0 {
				zeros--
			}
			left++
		}
		if right-left+1 > best {
			best = right - left + 1
		}
	}
	// window includes the zero; deleting it costs one slot, but we must
	// delete exactly one element either way
	if zeros == 0 {
		return len(nums) - 1 // all ones, must still delete one element
	}
	return best - 1
}
