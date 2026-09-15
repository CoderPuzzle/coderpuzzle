func countLargestGroup(n int) int {
	// Digit sums stay below 37 for n <= 10^4, so a fixed array replaces a
	// hash map: bucket every value by its digit sum, then count the buckets
	// reaching the maximum.
	var counts [37]int
	best := 0
	for value := 1; value <= n; value++ {
		digitSum := 0
		for rest := value; rest > 0; rest /= 10 {
			digitSum += rest % 10
		}
		counts[digitSum]++
		if counts[digitSum] > best {
			best = counts[digitSum]
		}
	}
	result := 0
	for _, count := range counts {
		if count == best {
			result++
		}
	}
	return result
}
