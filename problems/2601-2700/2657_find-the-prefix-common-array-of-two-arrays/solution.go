func findThePrefixCommonArray(A []int, B []int) []int {
	// One shared walk bumps a frequency counter for each value; because both
	// arrays are permutations, a counter reaching 2 means that value now
	// appears in both prefixes, so each hit raises the running total.
	common := 0
	seen := make([]int, len(A)+1)
	result := make([]int, 0, len(A))
	for index := range A {
		seen[A[index]]++
		if seen[A[index]] == 2 {
			common++
		}
		seen[B[index]]++
		if seen[B[index]] == 2 {
			common++
		}
		result = append(result, common)
	}
	return result
}
