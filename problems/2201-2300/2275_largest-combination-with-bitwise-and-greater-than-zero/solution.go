func largestCombination(candidates []int) int {
	counts := [24]int{}
	for _, value := range candidates {
		for bit := 0; bit < 24; bit++ {
			if value>>bit&1 == 1 {
				counts[bit]++
			}
		}
	}
	answer := 0
	for _, count := range counts {
		if count > answer {
			answer = count
		}
	}
	return answer
}
