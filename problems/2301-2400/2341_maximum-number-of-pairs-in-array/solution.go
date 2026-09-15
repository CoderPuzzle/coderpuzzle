func numberOfPairs(nums []int) []int {
	counts := map[int]int{}
	for _, num := range nums {
		counts[num]++
	}
	pairs := 0
	leftovers := 0
	for _, count := range counts {
		pairs += count / 2
		leftovers += count % 2
	}
	return []int{pairs, leftovers}
}
