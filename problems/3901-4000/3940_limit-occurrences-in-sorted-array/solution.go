func limitOccurrences(nums []int, k int) []int {
	answer := []int{}
	seen := 0
	previous := 0
	hasPrevious := false
	for _, value := range nums {
		if !hasPrevious || value != previous {
			previous = value
			seen = 0
			hasPrevious = true
		}
		if seen < k {
			answer = append(answer, value)
			seen++
		}
	}
	return answer
}
