func mostFrequentEven(nums []int) int {
	counts := map[int]int{}
	for _, num := range nums {
		if num%2 == 0 {
			counts[num]++
		}
	}
	bestValue := -1
	bestCount := 0
	for value, count := range counts {
		if count > bestCount || (count == bestCount && value < bestValue) {
			bestCount = count
			bestValue = value
		}
	}
	return bestValue
}
