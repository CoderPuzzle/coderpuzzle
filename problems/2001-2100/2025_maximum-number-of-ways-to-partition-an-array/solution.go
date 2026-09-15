func waysToPartition(nums []int, k int) int {
	var total int64
	for _, value := range nums {
		total += int64(value)
	}

	right := make(map[int64]int)
	var prefix int64
	for pivot := 1; pivot < len(nums); pivot++ {
		prefix += int64(nums[pivot-1])
		right[2*prefix-total]++
	}

	left := make(map[int64]int)
	answer := right[0]
	prefix = 0
	for index, value := range nums {
		delta := int64(k) - int64(value)
		candidate := left[delta] + right[-delta]
		if candidate > answer {
			answer = candidate
		}

		if index < len(nums)-1 {
			prefix += int64(value)
			difference := 2*prefix - total
			right[difference]--
			left[difference]++
		}
	}

	return answer
}
