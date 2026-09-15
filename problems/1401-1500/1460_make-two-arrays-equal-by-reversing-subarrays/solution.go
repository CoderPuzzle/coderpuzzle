func canBeEqual(target []int, arr []int) bool {
	counts := make([]int, 1001)
	for _, value := range target {
		counts[value]++
	}
	for _, value := range arr {
		counts[value]--
	}
	for _, count := range counts {
		if count != 0 {
			return false
		}
	}
	return true
}
