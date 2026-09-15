func checkIfExist(arr []int) bool {
	// Insert after the lookup so an element can never match itself.
	seen := map[int]bool{}
	for _, value := range arr {
		if seen[2*value] || (value%2 == 0 && seen[value/2]) {
			return true
		}
		seen[value] = true
	}
	return false
}
