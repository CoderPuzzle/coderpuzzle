func maximumGroups(grades []int) int {
	n := len(grades)
	root := 0
	for (root+1)*(root+1) <= 8*n+1 {
		root++
	}
	return (root - 1) / 2
}
