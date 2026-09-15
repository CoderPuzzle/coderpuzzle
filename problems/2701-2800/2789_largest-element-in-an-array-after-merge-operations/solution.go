func maxArrayValue(nums []int) int64 {
	pile := int64(nums[len(nums)-1])
	best := pile
	for i := len(nums) - 2; i >= 0; i-- {
		value := int64(nums[i])
		if pile >= value {
			pile += value
		} else {
			pile = value
		}
		if pile > best {
			best = pile
		}
	}
	return best
}
