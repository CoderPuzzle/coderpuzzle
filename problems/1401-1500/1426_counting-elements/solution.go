func countElements(arr []int) int {
	seen := make(map[int]bool, len(arr))
	for _, x := range arr {
		seen[x] = true
	}
	count := 0
	for _, x := range arr {
		if seen[x+1] {
			count++
		}
	}
	return count
}
