func sumDigitDifferences(nums []int) int64 {
	var total int64
	n := int64(len(nums))
	for place := 1; int64(nums[0])/int64(place) > 0; place *= 10 {
		var counts [10]int64
		for _, num := range nums {
			counts[int64(num)/int64(place)%10]++
		}
		var pairs int64
		for _, count := range counts {
			pairs += count * (n - count)
		}
		total += pairs / 2
	}
	return total
}
