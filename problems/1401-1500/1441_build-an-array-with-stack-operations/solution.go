func buildArray(target []int, n int) []string {
	wanted := make(map[int]bool, len(target))
	for _, value := range target {
		wanted[value] = true
	}
	last := target[len(target)-1]
	operations := make([]string, 0, 2*last)
	for value := 1; value <= last; value++ {
		operations = append(operations, "Push")
		if !wanted[value] {
			operations = append(operations, "Pop")
		}
	}
	return operations
}
