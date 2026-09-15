func countValidSubarrays(nums []int, x int) int {
	answer := 0
	for left := range nums {
		var sum int64
		for right := left; right < len(nums); right++ {
			sum += int64(nums[right])
			first := sum
			for first >= 10 {
				first /= 10
			}
			if first == int64(x) && sum%10 == int64(x) {
				answer++
			}
		}
	}
	return answer
}
