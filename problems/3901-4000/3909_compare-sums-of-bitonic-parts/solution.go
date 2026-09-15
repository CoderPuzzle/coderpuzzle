func compareBitonicSums(nums []int) int {
	var total int64
	var ascending int64
	peak := nums[0]
	for index, value := range nums {
		total += int64(value)
		if index == 0 || value > nums[index-1] {
			ascending += int64(value)
		}
		if value > peak {
			peak = value
		}
	}
	descending := total - ascending + int64(peak)
	if ascending > descending {
		return 0
	}
	if descending > ascending {
		return 1
	}
	return -1
}
