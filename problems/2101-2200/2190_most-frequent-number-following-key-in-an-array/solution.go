// Count each value that immediately follows a key occurrence and take the
// argmax; the input guarantees a unique winner.
func mostFrequent(nums []int, key int) int {
	counts := make(map[int]int)
	for i := 0; i+1 < len(nums); i++ {
		if nums[i] == key {
			counts[nums[i+1]]++
		}
	}
	bestValue, bestCount := 0, -1
	for value, count := range counts {
		if count > bestCount {
			bestCount = count
			bestValue = value
		}
	}
	return bestValue
}
