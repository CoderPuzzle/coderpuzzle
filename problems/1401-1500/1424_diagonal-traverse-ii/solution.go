func findDiagonalOrder(nums [][]int) []int {
	var buckets [][]int
	for i := 0; i < len(nums); i++ {
		for j := 0; j < len(nums[i]); j++ {
			key := i + j
			for len(buckets) <= key {
				buckets = append(buckets, nil)
			}
			buckets[key] = append(buckets[key], nums[i][j])
		}
	}
	total := 0
	for _, bucket := range buckets {
		total += len(bucket)
	}
	result := make([]int, 0, total)
	for _, bucket := range buckets {
		for i := len(bucket) - 1; i >= 0; i-- {
			result = append(result, bucket[i])
		}
	}
	return result
}
